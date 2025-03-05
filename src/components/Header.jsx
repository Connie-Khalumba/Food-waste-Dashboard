import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import avatar from '../Assets/girl.png'

const Header = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`shadow-md p-4 flex justify-between items-center bg-white dark:bg-gray-900 ${isDarkMode ? 'dark:text-white' : ''}`} // Added bg-white and dark:bg-gray-900
    >
      <button
        onClick={() => { toggleSidebar(); console.log('Toggling Sidebar'); }}
        className={`md:hidden p-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-600'}`}
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className={`border p-2 rounded-lg w-1/3 ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:text-white' : 'border-gray-300'}`}
      />
      <div className="flex items-center space-x-4">
        <span className={isDarkMode ? 'dark:text-white' : 'text-gray-600'}>Eunice Wairimu</span>
        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;