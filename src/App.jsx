import React, { useState, useEffect } from "react";
import { BookOpen, FileText, StickyNote } from "lucide-react";
import ReportViewer from "./components/ReportViewer";
import NotesPanel from "./components/NotesPanel";
import Loader from "./components/Loader";
import { fetchReport } from "./api/mockApi";

const App = () => {
  const [report, setReport] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    // Simulate loading with a minimum duration for better UX
    const timer = setTimeout(() => {
      fetchReport().then(data => {
        setReport(data);
        setLoading(false);
      });
    }, 1200);
    
    // Load saved notes
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    
    return () => clearTimeout(timer);
  }, []);

  const addNote = (sectionId, text) => {
    const newNote = { 
      sectionId, 
      text,
      date: new Date().toLocaleDateString(),
      id: Date.now().toString()
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    
    // Show animation feedback
    const noteElement = document.getElementById("notes-container");
    if (noteElement) {
      noteElement.classList.add("flash-highlight");
      setTimeout(() => noteElement.classList.remove("flash-highlight"), 700);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      
      // Highlight effect on the scrolled section
      section.classList.add("highlight-section");
      setTimeout(() => section.classList.remove("highlight-section"), 1500);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="transform scale-110">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      currentTheme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
    }`}>
      {/* Header */}
      <header className={`px-6 py-4 border-b transition-colors duration-300 ${
        currentTheme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              currentTheme === "dark" ? "bg-blue-900" : "bg-blue-100"
            }`}>
              <FileText className={`h-5 w-5 ${
                currentTheme === "dark" ? "text-blue-400" : "text-blue-600"
              }`} />
            </div>
            <h1 className="text-xl font-bold">Eightgen AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                currentTheme === "dark" 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {currentTheme === "dark" ? "🌙" : "☀️"}
            </button>
            
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full transition-colors ${
                currentTheme === "dark" 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <StickyNote className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex space-x-6">
          {/* Main report viewer */}
          <div className={`transition-all duration-500 ease-in-out ${
            showSidebar ? "w-2/3" : "w-full"
          }`}>
            <div className="animate-fade-in">
              <ReportViewer report={report} onAddNote={addNote} />
            </div>
          </div>
          
          {/* Notes panel */}
          <div 
            id="notes-container"
            className={`transition-all duration-500 ease-in-out ${
              showSidebar ? "w-1/3 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-8 overflow-hidden"
            }`}
          >
            <NotesPanel 
              notes={notes} 
              onNoteClick={scrollToSection} 
              onDeleteNote={deleteNote} 
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`mt-12 py-4 px-6 text-center text-sm transition-colors duration-300 ${
        currentTheme === "dark" ? "text-gray-500" : "text-gray-500"
      }`}>
        © {new Date().getFullYear()} Eightgen AI • All Rights Reserved
      </footer>
      
      {/* Custom animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .flash-highlight {
          animation: flash 0.7s ease-out;
        }
        
        @keyframes flash {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .highlight-section {
          animation: highlight 1.5s ease-out;
        }
        
        @keyframes highlight {
          0% { background-color: transparent; }
          20% { background-color: rgba(59, 130, 246, 0.1); }
          100% { background-color: transparent; }
        }
      `}</style>
    </div>
  );
};

export default App;