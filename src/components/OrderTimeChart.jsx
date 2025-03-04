// src/components/OrderTimeChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderTimeChart = () => {
  const orderTimeData = {
    labels: ['Afternoon', 'Evening', 'Morning'],
    datasets: [
      {
        data: [1890, 1260, 850], // Keep the data as is, but ensure it fits visually
        backgroundColor: ['#4ADE80', '#A3E635', '#D1D5DB'], // Green, Yellow-Green, Gray
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allow custom sizing
    responsive: true, // Ensure responsiveness
    animation: false, // Disable animations for performance
    plugins: {
      legend: { display: true, position: 'bottom' }, // Keep legend at bottom, adjust if needed
    },
    // No scales needed for Pie charts, but we can control size via container
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-h-64 h-64 w-full"> {/* Fixed height and width */}
      <h2 className="text-lg font-semibold mb-2">Order Time</h2>
      <p className="text-sm text-gray-500">From 1-6 Dec, 2020</p>
      <div className="h-full w-full"> {/* Ensure chart fits within container */}
        <Pie data={orderTimeData} options={options} />
      </div>
      <div className="mt-4">
        <p>Afternoon: 40%</p>
        <p>Evening: 32%</p>
        <p>Morning: 28%</p>
      </div>
    </div>
  );
};

export default OrderTimeChart;