import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // If using Context

const Sidebar = () => {
  const { isDarkMode } = useTheme(); // If using Context, otherwise use props

  return (
    <div className={`w-64 shadow-md ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}>
      <div className="p-4">
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>RediFu</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {['Dashboard', 'Pickup Schedule', 'Manage Menu', 'Customer Review', 'Settings', 'Payment', 'Accounts', 'Help'].map((item) => (
            <li key={item} className={`px-4 py-2 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} cursor-pointer`}>
              <Link to={item === 'Dashboard' ? '/' : '/'} className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-green-600'}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;