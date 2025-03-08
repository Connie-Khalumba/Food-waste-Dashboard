import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // Add for role-based rendering
import { FiHome, FiCalendar, FiStar, FiSettings, FiDollarSign, FiUsers, FiHelpCircle } from 'react-icons/fi';
import { BiHistory } from "react-icons/bi";
import { FiGlobe } from 'react-icons/fi';
import logo from '../Assets/logo.redifu-removebg-preview.png'

const Sidebar = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const { userRole } = useUser(); // Get user role

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Pickup Schedule', icon: FiCalendar, path: '/pickup-schedule' },
    { name: 'Order History', icon: BiHistory, path: '/order-history' },
    { name: 'Customer Review', icon: FiStar, path: '/customer-review' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
    { name: 'Payment', icon: FiDollarSign, path: '/payment' },
    { name: 'Accounts', icon: FiUsers, path: '/accounts' },
    { name: 'Help', icon: FiHelpCircle, path: '/help' },
    { name: 'Visit Main Website', icon: FiGlobe, path: 'https://redifu-git-main-conniekhalumbas-projects.vercel.app/' },
  ];

  // Add organization-specific menu items if needed
  if (userRole === 'organization') {
    menuItems.push({ name: 'Organization Reports', icon: FiDollarSign, path: '/organization-reports' });
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => { onClose(); console.log('Closing Sidebar'); }}
        />
      )}
      <div
        className={`
          fixed h-full shadow-md z-50 transition-transform duration-300
          ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-64
        `}
      >
        <div className="p-4">
          <img
            src={logo} 
            alt="RediFu Logo"
            className={`w-24 h-auto ${isDarkMode ? 'invert' : ''}`} // Adjust size and add invert for dark mode
          />
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