import React from 'react';
import { useTheme } from '../context/ThemeContext';

const RatingSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Your Rating</h2>
      <p className={`text-sm ${isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'} mb-2`}>How do you rate our services</p>
      <div className="flex justify-center items-center space-x-4">
        <div className="text-center">
          <div className={`w-20 h-20 ${isDarkMode ? 'bg-purple-700 dark:text-white' : 'bg-purple-200 text-purple-800'} rounded-full flex items-center justify-center`}>85%</div>
          <p className={`mt-2 text-sm ${isDarkMode ? 'dark:text-gray-300' : ''}`}>Hygiene</p>
        </div>
        <div className="text-center">
          <div className={`w-20 h-20 ${isDarkMode ? 'bg-orange-700 dark:text-white' : 'bg-orange-200 text-orange-800'} rounded-full flex items-center justify-center`}>85%</div>
          <p className={`mt-2 text-sm ${isDarkMode ? 'dark:text-gray-300' : ''}`}>Food Taste</p>
        </div>
        <div className="text-center">
          <div className={`w-20 h-20 ${isDarkMode ? 'bg-blue-700 dark:text-white' : 'bg-blue-200 text-blue-800'} rounded-full flex items-center justify-center`}>92%</div>
          <p className={`mt-2 text-sm ${isDarkMode ? 'dark:text-gray-300' : ''}`}>Packaging</p>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;