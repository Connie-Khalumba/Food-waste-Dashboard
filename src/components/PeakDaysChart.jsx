import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PeakDaysChart = () => {
  const peakDaysData = {
    labels: ['01', '02', '03', '04', '05', '06', '07'], // Reduced to 7 days for compactness
    datasets: [
      {
        label: 'Last 6 days',
        data: [20, 15, 10, 25, 20, 18, 15], // Match reduced labels
        backgroundColor: 'rgba(74, 222, 128, 0.5)', // Green
        borderColor: 'rgba(74, 222, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Last Week',
        data: [18, 12, 8, 20, 15, 16, 13], // Match reduced labels
        backgroundColor: 'rgba(209, 213, 219, 0.5)', // Gray
        borderColor: 'rgba(209, 213, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allow custom sizing
    responsive: true, // Ensure responsiveness
    animation: false, // Disable animations for performance
    plugins: {
      legend: { display: false }, // Hide legend to prevent overflow (optional, adjust if needed)
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } }, // Smaller font for x-axis labels
        barPercentage: 0.8, // Make bars narrower to prevent overflow
        categoryPercentage: 0.8,
      },
      y: {
        beginAtZero: true,
        max: 30, // Limit y-axis to prevent stretching
        ticks: { font: { size: 12 } }, // Smaller font for y-axis labels
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-h-64 h-64 w-full overflow-hidden"> {/* Added overflow-hidden */}
      <h2 className="text-lg font-semibold mb-2">Peak Days</h2>
      <p className="text-sm text-gray-600 mb-2">Amount of wasted food given out. <span className="text-green-600">↑ 2.1% vs last week</span></p>
      <p className="text-sm text-gray-500">Report from 1-12 Dec, 2022</p>
      <div className="h-full w-full"> {/* Ensure chart fits within container */}
        <Bar data={peakDaysData} options={options} />
      </div>
    </div>
  );
};

export default PeakDaysChart;