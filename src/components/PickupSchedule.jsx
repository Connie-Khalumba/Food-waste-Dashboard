import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg'

const PickupSchedule = () => {
  const { isDarkMode } = useTheme();
  const { userRole } = useUser();
  const [startDate, setStartDate] = useState(new Date());
  const [pickupData, setPickupData] = useState({ address: '', date: new Date(), volume: '', notes: '' });
  const [scheduledPickups, setScheduledPickups] = useState([]); // Mock data, replace with API

  const handleSubmit = (e) => {
    e.preventDefault();
    setScheduledPickups([...scheduledPickups, { ...pickupData, id: Date.now() }]);
    setPickupData({ address: '', date: new Date(), volume: '', notes: '' });
  };

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Pickup Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Scheduling Form (Resident View) */}
        {userRole === 'resident' && (
          <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
            <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Schedule a Pickup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Address"
                value={pickupData.address}
                onChange={(e) => setPickupData({ ...pickupData, address: e.target.value })}
                className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <DatePicker
                selected={pickupData.date}
                onChange={(date) => setPickupData({ ...pickupData, date })}
                showTimeSelect
                dateFormat="Pp"
                className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <input
                type="number"
                placeholder="Estimated Volume (kg)"
                value={pickupData.volume}
                onChange={(e) => setPickupData({ ...pickupData, volume: e.target.value })}
                className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <textarea
                placeholder="Notes"
                value={pickupData.notes}
                onChange={(e) => setPickupData({ ...pickupData, notes: e.target.value })}
                className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <button
                type="submit"
                className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
              >
                Schedule Pickup
              </button>
            </form>
          </div>
        )}

        {/* Scheduled Pickups List (Both Views, with Organization-specific features) */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Scheduled Pickups</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className={`mb-4 p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
          />
          <ul className="space-y-2">
            {scheduledPickups.map((pickup) => (
              <li key={pickup.id} className={`p-2 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'}`}>
                <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>
                  {pickup.address} - {new Date(pickup.date).toLocaleString()} ({pickup.volume} kg)
                </p>
                <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>{pickup.notes}</p>
                {userRole === 'organization' && (
                  <select
                    className={`mt-2 p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PickupSchedule;