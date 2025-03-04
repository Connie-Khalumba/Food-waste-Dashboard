// src/components/PeakDaysChart.js
// src/components/DashboardContent.js (or .jsx)
import React from 'react';
import PeakDaysChart from './PeakDaysChart';
import OrderTimeChart from './OrderTimeChart';
import RatingSection from './RatingSection';
import UpcomingPickups from './UpcomingPickups';
import OrderSection from './OrderSection';
import { useTheme } from '../context/ThemeContext'; // Ensure this import works

const DashboardContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`h-full overflow-auto p-6 ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
      {/* Top Row: Charts (2 columns) */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
        <PeakDaysChart />
        <OrderTimeChart />
      </div>

      {/* Bottom Row: Panels (2 main columns, with Order split below Upcoming Pickups) */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
        {/* Left Column: Your Rating */}
        <RatingSection />

        {/* Right Column: Split vertically into Upcoming Pickups and Order */}
        <div className={`flex flex-col gap-6 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
          <UpcomingPickups />
          <OrderSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;