import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PeakDaysChart = () => {
  const peakDaysData = {
    labels: ['01', '02', '03', '04', '05', '06', '07'], // Reduced from 12 to 7
  datasets: [
    {
      label: 'Last 6 days',
      data: [20, 15, 10, 25, 20, 18, 15], // Match reduced labels
      backgroundColor: 'rgba(74, 222, 128, 0.5)',
      borderColor: 'rgba(74, 222, 128, 1)',
      borderWidth: 1,
    },
    {
      label: 'Last Week',
      data: [18, 12, 8, 20, 15, 16, 13], // Match reduced labels
      backgroundColor: 'rgba(209, 213, 219, 0.5)',
      borderColor: 'rgba(209, 213, 219, 1)',
      borderWidth: 1,
    },
  ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Peak Days</h2>
      <p className="text-sm text-gray-600 mb-2">Amount of wasted food given out. <span className="text-green-600">↑ 2.1% vs last week</span></p>
      <p className="text-sm text-gray-500">Report from 1-12 Dec, 2022</p>
      <Bar data={peakDaysData} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  );
};

export default PeakDaysChart;