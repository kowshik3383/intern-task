import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, ChevronRight, Edit, CheckCircle } from 'lucide-react';

const NotesPanel = ({ notes, onNoteClick, onDeleteNote }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [typingIndex, setTypingIndex] = useState(null);
  const [animatedTexts, setAnimatedTexts] = useState({});
  const [currentTheme, setCurrentTheme] = useState("light");
  
  const emptyState = notes.length === 0;
  const typingTimerRef = useRef(null);

  // Listen for theme changes from parent App component
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = document.body.classList.contains('dark') || 
                            document.documentElement.classList.contains('dark') ||
                            document.body.classList.contains('bg-gray-900');
          setCurrentTheme(isDarkMode ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Start typing animation when hovering
  useEffect(() => {
    if (typingIndex !== null && notes[typingIndex]) {
      const text = notes[typingIndex].text;
      let currentPos = 0;
      
      clearInterval(typingTimerRef.current);
      setAnimatedTexts(prev => ({ ...prev, [typingIndex]: '' }));
      
      typingTimerRef.current = setInterval(() => {
        if (currentPos <= text.length) {
          setAnimatedTexts(prev => ({
            ...prev,
            [typingIndex]: text.substring(0, currentPos)
          }));
          currentPos++;
        } else {
          clearInterval(typingTimerRef.current);
        }
      }, 25); // Speed of typing
    }
    
    return () => clearInterval(typingTimerRef.current);
  }, [typingIndex, notes]);

  // Theme-aware styling
  const themeStyles = {
    container: currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100',
    header: currentTheme === 'dark' 
      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200' 
      : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800',
    emptyState: currentTheme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-400',
    noteItem: currentTheme === 'dark'
      ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-750 text-gray-300 hover:shadow-blue-900/10'
      : 'border-gray-100 bg-gradient-to-r from-white to-gray-50 text-gray-800 hover:shadow-md',
    noteDate: currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-500',
    deleteButton: currentTheme === 'dark' 
      ? 'text-gray-500 hover:text-red-400 hover:bg-gray-700' 
      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
  };

  return (
    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className={`shadow-lg rounded-lg border ${themeStyles.container}`}>
        {/* Header with toggle */}
        <div 
          className={`px-5 py-4 flex items-center justify-between cursor-pointer ${themeStyles.header}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <h2 className="text-lg font-bold">Your Notes</h2>
            <span className="ml-2 text-gray-500 text-sm">{notes.length}</span>
          </div>
          <ChevronRight 
            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </div>
        
        {/* Notes container with animation */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          {emptyState ? (
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${themeStyles.emptyState}`}>
                <PlusCircle className="h-8 w-8" />
              </div>
              <p className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No notes yet</p>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Your saved notes will appear here</p>
            </div>
          ) : (
            <ul className="p-3 space-y-3">
              {notes.map((note, index) => (
                <li
                  key={note.id || index}
                  className={`
                    transform transition-all duration-200 hover:translate-x-1
                    ${typingIndex === index ? 'ring-2 ring-blue-400 scale-102' : ''}
                  `}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setTypingIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTypingIndex(null);
                  }}
                >
                  <div className={`
                    p-3 rounded-lg flex justify-between items-start cursor-pointer 
                    border shadow-sm hover:shadow-md transition-all duration-200
                    ${themeStyles.noteItem}
                  `}>
                    <div 
                      onClick={() => onNoteClick(note.sectionId)}
                      className="flex-1"
                    >
                      <div className="flex items-center mb-1">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                        <p className="font-medium">
                          {typingIndex === index
                            ? <span className="relative">
                                {animatedTexts[index] || ''}
                                <span className="absolute right-0 animate-blink text-blue-500">|</span>
                              </span>
                            : note.text
                          }
                        </p>
                      </div>
                      {note.date && (
                        <p className={`text-xs mt-1 ${themeStyles.noteDate}`}>
                          {note.date}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNote(index);
                      }}
                      className={`
                        ml-2 p-2 rounded-full transition-all duration-200
                        ${themeStyles.deleteButton}
                        ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                      `}
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        .scale-102 {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
};

export default NotesPanel;