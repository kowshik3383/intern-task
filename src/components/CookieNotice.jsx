import React, { useState } from 'react';

const CookieNotice = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    // You could add more functionality here, like setting cookies
  };

  const handlePreferences = () => {
    setIsVisible(false);
    // You could redirect to preferences page or open a modal here
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs p-4 bg-white rounded-lg shadow-lg">
      <span className="font-semibold text-gray-800">🍪 Cookie Notice</span>
      <p className="mt-4 text-sm text-gray-600">
        We use cookies to ensure that we give you the best experience on our website.{' '}
        <a href="#" className="text-blue-500 hover:underline">
          Read cookies policies
        </a>
        .
      </p>
      <div className="flex items-center justify-between mt-4 gap-4">
        <button
          className="text-xs text-gray-800 underline transition-all hover:text-gray-400 focus:outline-none"
          onClick={handlePreferences}
        >
          Manage your preferences
        </button>
        <button
          className="px-4 py-2.5 text-xs font-medium text-white bg-gray-900 rounded-lg transition-all hover:bg-gray-700 focus:outline-none"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;