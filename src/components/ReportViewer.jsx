import React, { useState, useEffect } from "react";
import { BookOpen, Highlighter, MessageSquarePlus, X, Bookmark } from "lucide-react";

const ReportViewer = ({ report, onAddNote }) => {
  const [highlights, setHighlights] = useState({});
  const [selectedText, setSelectedText] = useState("");
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [animateSection, setAnimateSection] = useState(null);

  useEffect(() => {
    if (activeSectionId) {
      setAnimateSection(activeSectionId);
      const timer = setTimeout(() => setAnimateSection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [activeSectionId]);

  const handleSelection = (sectionId) => {
    const selection = window.getSelection().toString().trim();
    if (!selection) return;
    
    setSelectedText(selection);
    setHighlights((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), selection],
    }));
    
    setActiveSectionId(sectionId);
  };

  const removeHighlight = (sectionId, text) => {
    setHighlights((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((t) => t !== text),
    }));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl w-full max-w-5xl mx-auto overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800">{report.title}</h1>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 flex items-center">
          <span>{report.sections.length} sections</span>
          <span className="mx-2 hidden sm:inline">•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Report content */}
      <div className="p-4 sm:p-6 space-y-6">
        {report.sections.map((section) => (
          <div 
            key={section.id} 
            className={`
              rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out
              ${animateSection === section.id ? 'transform scale-101 shadow-md' : ''}
              ${activeSectionId === section.id ? 'ring-2 ring-blue-200' : ''}
            `}
          >
            {/* Section header */}
            <div className="border-b border-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                <Bookmark className="h-4 w-4 text-blue-500 mr-2" />
                {section.title}
              </h2>
              <div className="text-xs sm:text-sm text-gray-500">{highlights[section.id]?.length || 0} highlights</div>
            </div>
            
            {/* Section content */}
            <div className="p-3 sm:p-5">
              <p
                className="leading-relaxed text-gray-700 cursor-text select-text text-sm sm:text-base"
                onMouseUp={() => handleSelection(section.id)}
              >
                {section.content.split(" ").map((word, index) => {
                  const isHighlighted = highlights[section.id]?.includes(word);
                  return (
                    <span
                      key={index}
                      className={`transition-all duration-200 px-0.5 rounded ${isHighlighted ? "bg-yellow-200 text-yellow-800" : ""}`}
                    >
                      {word}{" "}
                    </span>
                  );
                })}
              </p>
              
              {/* Highlights section */}
              {highlights[section.id]?.length > 0 && (
                <div className="mt-3 sm:mt-4 pt-2 border-t border-gray-100">
                  <div className="flex items-center mb-2">
                    <Highlighter className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Highlights</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {highlights[section.id]?.map((text, i) => (
                      <span
                        key={i}
                        className="group bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs sm:text-sm flex items-center hover:bg-yellow-200 transition-all duration-200 border border-yellow-200 shadow-sm"
                      >
                        <span className="truncate max-w-[100px] sm:max-w-xs">{text}</span>
                        <button
                          onClick={() => removeHighlight(section.id, text)}
                          className="ml-1 p-0.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-yellow-300 transition-opacity duration-200"
                        >
                          <X className="h-3 w-3 text-yellow-700" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add note button */}
              {selectedText && activeSectionId === section.id && (
                <div className="mt-3 sm:mt-4 flex items-center animate-fadeIn">
                  <button
                    onClick={() => {
                      onAddNote(section.id, selectedText);
                      setSelectedText("");
                    }}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm transform hover:translate-y-px active:translate-y-0.5"
                  >
                    <MessageSquarePlus className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">Add Note</span>
                  </button>
                  <button
                    onClick={() => setSelectedText("")}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .scale-101 {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
};

export default ReportViewer;
