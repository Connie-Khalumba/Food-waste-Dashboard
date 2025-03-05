import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { GiTrashCan } from 'react-icons/gi'; // Green trash can icon from react-icons

const UpcomingPickups = () => {
  const { isDarkMode } = useTheme(); 
  const upcomingPickupsClass = isDarkMode ? 'text-white' : 'text-gray-800';

  const pickups = [
    { location: 'Suba-face', time: '9:00 am' },
    { location: 'Soweto', time: '10:00 am' },
    { location: 'Ayany Estate', time: '11:00 am' },
    { location: 'Kamkunji', time: '11:30 am' },
  ];

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Upcoming Pickups</h2>
      <p className={`text-sm ${isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'} mb-2`}>Adipiscing elit, sed do eiusmod tempor</p>
      <ul className="space-y-2">
        {pickups.map((pickup, index) => (
          <li key={index} className="flex items-center space-x-4">
            <GiTrashCan className="w-5 h-5 text-green-500" /> {/* Green trash can icon */}
            <span className={upcomingPickupsClass}>{pickup.location}</span>
            <span className={`ml-auto ${upcomingPickupsClass}`}>{pickup.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingPickups;