import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiHome, FiCalendar, FiMenu, FiStar, FiSettings, FiDollarSign, FiUsers, FiHelpCircle } from 'react-icons/fi'; // Removed FiMenuIcon

const Sidebar = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Pickup Schedule', icon: FiCalendar, path: '/' },
    { name: 'Manage Menu', icon: FiMenu, path: '/' },
    { name: 'Customer Review', icon: FiStar, path: '/' },
    { name: 'Settings', icon: FiSettings, path: '/' },
    { name: 'Payment', icon: FiDollarSign, path: '/' },
    { name: 'Accounts', icon: FiUsers, path: '/' },
    { name: 'Help', icon: FiHelpCircle, path: '/' },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed h-full shadow-md z-50 transition-transform duration-300
          ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-64
        `}
      >
        <div className="p-4">
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>RediFu</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className={`px-4 py-2 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} cursor-pointer`}>
                <Link to={item.path} className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-green-600'} flex items-center space-x-2`} onClick={onClose}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;