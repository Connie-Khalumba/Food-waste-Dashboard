import React, { useState, useEffect } from 'react';
import PeakDaysChart from './PeakDaysChart';
import RatingSection from './RatingSection';
import UpcomingPickups from './UpcomingPickups';
import OrderSection from './OrderSection';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore';
import conifers from '../Assets/conifers-1867371_1280.jpg'

const OrganizationDashboard = () => {
  const { isDarkMode } = useTheme();
  const [organizationMetrics, setOrganizationMetrics] = useState({
    totalPickups: 0,
    totalWaste: '0 kg',
    activeUsers: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const querySnapshot = await getDocs(collection(db, 'organizationMetrics'));
      const metrics = querySnapshot.docs.map(doc => doc.data())[0] || {};
      setOrganizationMetrics({
        totalPickups: metrics.totalPickups || 0,
        totalWaste: metrics.totalWaste || '0 kg',
        activeUsers: metrics.activeUsers || 0,
      });
    };
    fetchMetrics();
  }, []);

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
        {/* Top Row: Organization Metrics and Charts */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4 md:mb-6">
          <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
            <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Organization Metrics</h2>
            <p>Total Pickups: {organizationMetrics.totalPickups}</p>
            <p>Total Waste: {organizationMetrics.totalWaste}</p>
            <p>Active Users: {organizationMetrics.activeUsers}</p>
          </div>
          <PeakDaysChart />
        </div>

        {/* Bottom Row: Panels */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <RatingSection />
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