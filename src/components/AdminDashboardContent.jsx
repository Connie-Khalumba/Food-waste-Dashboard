// src/components/AdminDashboardContent.js
import React from 'react';

const AdminDashboardContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Admin Overview</h2>
        <p className="text-sm text-gray-600">Manage users, pickups, and waste data.</p>
        {/* Add admin-specific charts, tables, or data here */}
      </div>
      {/* You can copy and modify the user dashboard components (e.g., PeakDaysChart, OrderTimeChart) or create new ones for admin needs */}
    </div>
  );
};

export default AdminDashboardContent;