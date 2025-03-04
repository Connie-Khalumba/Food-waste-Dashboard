import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderSection = () => {
  const salesData = {
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [
      {
        label: 'Last 6 days',
        data: [1000, 1200, 800, 1500, 1300, 1800],
        borderColor: '#3B82F6',
        fill: false,
      },
      {
        label: 'Last Week',
        data: [900, 1100, 700, 1400, 1200, 1600],
        borderColor: '#D1D5DB',
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Order</h2>
      <p className="text-sm text-gray-500 mb-2">2,568 <span className="text-red-600">↓ 2.1% vs last week</span></p>
      <p className="text-sm text-gray-500">Sales from 1-6 Dec, 2020</p>
      <div className="mt-4">
        <Bar data={salesData} options={{ maintainAspectRatio: false, responsive: true }} />
      </div>
    </div>
  );
};

export default OrderSection;