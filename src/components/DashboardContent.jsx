import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardContent = () => {
  // Data for Peak Days (Bar Chart)
  const peakDaysData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Last 6 days',
        data: [20, 15, 10, 25, 20, 18, 15, 12, 14, 22, 19, 23],
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        borderColor: 'rgba(74, 222, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Last Week',
        data: [18, 12, 8, 20, 15, 16, 13, 10, 12, 18, 16, 20],
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        borderColor: 'rgba(209, 213, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Order Time (Pie Chart)
  const orderTimeData = {
    labels: ['Afternoon', 'Evening', 'Morning'],
    datasets: [
      {
        data: [1890, 1260, 850],
        backgroundColor: ['#4ADE80', '#A3E635', '#D1D5DB'],
      },
    ],
  };

  // Data for Sales (Line Chart)
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Peak Days Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Peak Days</h2>
        <p className="text-sm text-gray-600 mb-2">Amount of wasted food given out. <span className="text-green-600">↑ 2.1% vs last week</span></p>
        <p className="text-sm text-gray-500">Report from 1-12 Dec, 2022</p>
        <Bar data={peakDaysData} options={{ maintainAspectRatio: false, responsive: true }} />
      </div>

      {/* Order Time Section */}
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

      {/* Your Rating Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Rating</h2>
        <p className="text-sm text-gray-500 mb-2">Lorem ipsum dolor sit amet, consectetur</p>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center text-purple-800">85%</div>
            <p className="mt-2 text-sm">Hygiene</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center text-orange-800">85%</div>
            <p className="mt-2 text-sm">Food Taste</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">92%</div>
            <p className="mt-2 text-sm">Packaging</p>
          </div>
        </div>
      </div>

      {/* Upcoming Pickups Section */}
      <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Upcoming Pickups</h2>
        <p className="text-sm text-gray-500 mb-2">Adipiscing elit, sed do eiusmod tempor</p>
        <ul className="space-y-2">
          {['Suba-face', 'Soweto', 'Ayany Estate', 'Kamkunji'].map((location, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-green-500 rounded-full"></span>
              <span>{location}</span>
              <span className="ml-auto">{index === 0 ? '9:00 am' : index === 1 ? '10:00 am' : index === 2 ? '11:00 am' : '11:30 am'}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Order</h2>
        <p className="text-sm text-gray-500 mb-2">2,568 <span className="text-red-600">↓ 2.1% vs last week</span></p>
        <p className="text-sm text-gray-500">Sales from 1-6 Dec, 2020</p>
        <div className="mt-4">
          <Bar data={salesData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;