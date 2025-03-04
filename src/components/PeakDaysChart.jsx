// src/components/PeakDaysChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext'; // Updated path

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PeakDaysChart = () => {
  const { isDarkMode } = useTheme();

  const peakDaysData = {
    labels: ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        label: 'Last 6 days',
        data: [20, 15, 10, 25, 20, 18, 15],
        backgroundColor: 'rgba(74, 222, 128, 0.5)', // Green (same in both modes)
        borderColor: 'rgba(74, 222, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Last Week',
        data: [18, 12, 8, 20, 15, 16, 13],
        backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(209, 213, 219, 0.5)', // Gray, darker in dark mode
        borderColor: isDarkMode ? 'rgba(156, 163, 175, 1)' : 'rgba(209, 213, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { font: { size: 12, color: isDarkMode ? '#FFFFFF' : '#4A5568' } } },
      y: { beginAtZero: true, max: 30, ticks: { font: { size: 12, color: isDarkMode ? '#FFFFFF' : '#4A5568' } } },
    },
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md max-h-64 h-64 w-full overflow-hidden ${isDarkMode ? 'dark:bg-gray-800 dark:text-white dark:shadow-gray-700' : ''}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Peak Days</h2>
      <p className={`text-sm text-gray-600 mb-2 ${isDarkMode ? 'dark:text-gray-300' : ''}`}>
        Amount of wasted food given out. <span className={isDarkMode ? 'dark:text-green-400' : 'text-green-600'}>↑ 2.1% vs last week</span>
      </p>
      <p className={`text-sm ${isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}`}>Report from 1-12 Dec, 2022</p>
      <div className="h-full w-full">
        <Bar data={peakDaysData} options={options} />
      </div>
    </div>
  );
};

export default PeakDaysChart;