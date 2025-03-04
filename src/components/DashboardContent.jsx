import React from 'react';
import PeakDaysChart from './PeakDaysChart';
import OrderTimeChart from './OrderTimeChart';
import RatingSection from './RatingSection';
import UpcomingPickups from './UpcomingPickups';
import OrderSection from './OrderSection';

const DashboardContent = () => {
  return (
    <div className="h-full overflow-auto p-6">
      {/* Upper Section: Charts (Graphs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PeakDaysChart />
        <OrderTimeChart />
        <OrderSection />
      </div>

      {/* Lower Section: Other Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RatingSection />
        <UpcomingPickups />
      </div>
    </div>
  );
};

export default DashboardContent;