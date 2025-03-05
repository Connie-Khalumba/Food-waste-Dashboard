import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi'; // Add these imports

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [profile, setProfile] = useState({ name: 'Eunice Wairimu', email: 'eunice@example.com', password: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  return (
    <div className={`p-4 md:p-6 ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Profile Settings */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Profile</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              placeholder="New Password"
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <button
              type="submit"
              className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Notifications Settings */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Notifications</h2>
          <div className="space-y-4">
            <label className={`flex items-center space-x-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className={`${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'border-gray-300'}`}
              />
              <span>Email Notifications</span>
            </label>
            <label className={`flex items-center space-x-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className={`${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'border-gray-300'}`}
              />
              <span>SMS Notifications</span>
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''} md:col-span-2`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Theme</h2>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;