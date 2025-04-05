import React, { useEffect, useState } from 'react';

const EnhancedLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 5));
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-40 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-50 rounded-lg" />
      
      {/* Main spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 border-r-indigo-500 border-b-purple-500 border-l-transparent shadow-lg" />
        
        {/* Inner spinner (opposite direction) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin animate-reverse rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-500 border-r-transparent border-b-blue-500" />
        
        {/* Center dot with pulse effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full animate-pulse shadow-md" />
      </div>
      
      {/* Progress bar */}
      <div className="w-32 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Loading text with fade effect  */}
      <div className="mt-3 text-sm font-medium text-gray-700 animate-pulse">
        Loading...
      </div>
    </div>
  );
};

export default EnhancedLoader;