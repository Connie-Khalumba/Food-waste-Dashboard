// redifu-dashboard/src/components/Header.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // Import useUser hook
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import avatar from '../Assets/girl.png';

const Header = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useUser(); // Access the user object

  const handleLogout = () => {
    signOut(auth).then(() => console.log('Logged out')).catch((error) => console.error('Logout failed:', error));
  };

  // Determine the display name (fallback to email or placeholder)
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  return (
    <header className="shadow-md p-4 flex justify-between items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <button
        onClick={() => { toggleSidebar(); console.log('Toggling Sidebar'); }}
        className="md:hidden p-2 text-gray-600 dark:text-white focus:outline-none"
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <button onClick={handleLogout} className="p-2 text-red-500 dark:text-red-400">Logout</button>
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-lg w-1/3 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-white">{displayName}</span>
        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;