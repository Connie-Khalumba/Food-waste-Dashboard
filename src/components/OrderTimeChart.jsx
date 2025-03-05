import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderTimeChart = () => {
  const { isDarkMode } = useTheme();

  const orderTimeData = {
    labels: ['Afternoon', 'Evening', 'Morning'],
    datasets: [
      {
        data: [1890, 1260, 850],
        backgroundColor: ['#4ADE80', '#A3E635', '#D1D5DB'], // Green, Yellow-Green, Gray
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    plugins: { legend: { display: true, position: 'bottom', labels: { color: isDarkMode ? '#FFFFFF' : '#4A5568' } } },
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md max-h-64 h-64 w-full overflow-hidden ${isDarkMode ? 'dark:bg-gray-800 dark:text-white dark:shadow-gray-700' : ''}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Order Time</h2>
      <p className={`text-sm ${isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}`}>From 1-6 Dec, 2020</p>
      <div className="h-full w-full">
        <Pie data={orderTimeData} options={options} />
      </div>
      <div className={`mt-4 ${isDarkMode ? 'dark:text-gray-300' : ''}`}>
        <p>Afternoon: 40%</p>
        <p>Evening: 32%</p>
        <p>Morning: 28%</p>
      </div>
    </div>
  );
};

export default OrderTimeChart;