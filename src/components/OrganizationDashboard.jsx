import React, { useState, useEffect } from 'react';
import PeakDaysChart from './PeakDaysChart'; // Removed OrderTimeChart import
import RatingSection from './RatingSection';
import UpcomingPickups from './UpcomingPickups';
import OrderSection from './OrderSection';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // For role-based logic
import axios from 'axios'; // Ensure axios is installed

const OrganizationDashboard = () => {
  const { isDarkMode } = useTheme();
  const { userRole } = useUser(); // Keep userRole if needed for future role-based logic
  const [organizationMetrics, setOrganizationMetrics] = useState({
    totalPickups: 0,
    totalWaste: '0 kg',
    activeUsers: 0,
  });

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/organization-metrics').then((response) => {
      setOrganizationMetrics(response.data);
    }).catch((error) => {
      console.error('Error fetching organization metrics:', error);
    });
  }, []);

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="p-4 md:p-6">
        {/* Top Row: Organization Metrics and Charts (stack on mobile, 2 columns on md+) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4 md:mb-6">
          <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
            <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Organization Metrics</h2>
            <p>Total Pickups: {organizationMetrics.totalPickups}</p>
            <p>Total Waste: {organizationMetrics.totalWaste}</p>
            <p>Active Users: {organizationMetrics.activeUsers}</p>
          </div>
          <PeakDaysChart />
        </div>

        {/* Bottom Row: Panels (stack on mobile, 2 columns on md+, with Order split below Upcoming Pickups on right) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Left Column: Customer Reviews */}
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

export default OrganizationDashboard;