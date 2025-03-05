import React from 'react';
import { useTheme } from '../context/ThemeContext';
import avatar from '../Assets/girl.png'

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`bg-white shadow-md p-4 flex justify-between items-center ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
      <input
        type="text"
        placeholder="Search..."
        className={`border p-2 rounded-lg ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:text-white' : ''}`}
      />
      <div className="flex items-center space-x-4">
        <span>Eunice Wairimu</span>
        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;