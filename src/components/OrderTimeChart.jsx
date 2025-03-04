import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderTimeChart = () => {
  const orderTimeData = {
    labels: ['Afternoon', 'Evening', 'Morning'],
    datasets: [
      {
        data: [1890, 1260, 850],
        backgroundColor: ['#4ADE80', '#A3E635', '#D1D5DB'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Order Time</h2>
      <p className="text-sm text-gray-500">From 1-6 Dec, 2020</p>
      <Pie data={orderTimeData} options={{ maintainAspectRatio: false, responsive: true }} />
      <div className="mt-4">
        <p>Afternoon: 40%</p>
        <p>Evening: 32%</p>
        <p>Morning: 28%</p>
      </div>
    </div>
  );
};

export default OrderTimeChart;