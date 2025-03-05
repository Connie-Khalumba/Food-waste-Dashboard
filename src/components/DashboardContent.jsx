import React from 'react';
import PeakDaysChart from './PeakDaysChart';
import OrderTimeChart from './OrderTimeChart';
import RatingSection from './RatingSection';
import UpcomingPickups from './UpcomingPickups';
import OrderSection from './OrderSection';
import { useTheme } from '../context/ThemeContext';
import conifers from '../Assets/conifers-1867371_1280.jpg'

const DashboardContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${conifers})`,
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent tiling
      }}
    >
      <div className="p-4 md:p-6">
        {/* Top Row: Charts (stack on mobile, 2 columns on md+) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4 md:mb-6">
          <PeakDaysChart />
          <OrderTimeChart />
        </div>

        {/* Bottom Row: Panels (stack on mobile, 2 columns on md+, with Order split below Upcoming Pickups on right) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Left Column: Your Rating */}
          <RatingSection />

          {/* Right Column: Split vertically into Upcoming Pickups and Order */}
          <div className="flex flex-col gap-4 md:gap-6">
            <UpcomingPickups />
            <OrderSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;