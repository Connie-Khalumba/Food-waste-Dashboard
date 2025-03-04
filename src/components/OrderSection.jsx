import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; // Added PointElement
import { useTheme } from '../context/ThemeContext';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend); // Updated registration

const OrderSection = () => {
  const { isDarkMode } = useTheme(); // Removed toggleTheme since it’s not used

  const salesData = {
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [
      {
        label: 'Last 6 days',
        data: [1000, 1200, 800, 1500, 1300, 1800],
        borderColor: '#3B82F6', // Blue (light mode)
        fill: false,
        tension: 0.1, // Smooth line curve (optional)
      },
      {
        label: 'Last Week',
        data: [900, 1100, 700, 1400, 1200, 1600],
        borderColor: isDarkMode ? '#A0AEC0' : '#D1D5DB', // Gray, darker in dark mode
        fill: false,
        tension: 0.1, // Smooth line curve (optional)
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false, // Disable animations for performance
    plugins: {
      legend: { display: true, position: 'bottom', labels: { color: isDarkMode ? '#FFFFFF' : '#4A5568' } },
    },
    scales: {
      x: { ticks: { font: { size: 12, color: isDarkMode ? '#FFFFFF' : '#4A5568' } } },
      y: { beginAtZero: true, ticks: { font: { size: 12, color: isDarkMode ? '#FFFFFF' : '#4A5568' } } },
    },
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md max-h-64 h-64 w-full overflow-hidden ${isDarkMode ? 'dark:bg-gray-800 dark:text-white dark:shadow-gray-700' : ''}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Order</h2>
      <p className={`text-sm text-gray-500 mb-2 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
        2,568 <span className={isDarkMode ? 'dark:text-red-400' : 'text-red-600'}>↓ 2.1% vs last week</span>
      </p>
      <p className={`text-sm ${isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}`}>Sales from 1-6 Dec, 2020</p>
      <div className="mt-4 h-full w-full">
        <Line data={salesData} options={options} />
      </div>
    </div>
  );
};

export default OrderSection;