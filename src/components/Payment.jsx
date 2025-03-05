import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg'

const Payment = () => {
  const { isDarkMode } = useTheme();
  const [paymentData, setPaymentData] = useState({ amount: '', method: 'credit' });
  const [paymentHistory, setPaymentHistory] = useState([]); // Mock data, replace with API

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentHistory([...paymentHistory, { ...paymentData, id: Date.now(), date: new Date().toLocaleDateString(), status: 'Pending' }]);
    setPaymentData({ amount: '', method: 'credit' });
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
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Payment Form */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Make a Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Amount ($)"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <select
              value={paymentData.method}
              onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            >
              <option value="credit">Credit Card</option>
              <option value="paypal">Intasend</option>
              <option value="bank">Bank Transfer</option>
              <option value="bank">m-pesa</option>
            </select>
            <button
              type="submit"
              className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
              Pay Now
            </button>
          </form>
        </div>

        {/* Payment History */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Payment History</h2>
          <ul className="space-y-2">
            {paymentHistory.map((payment) => (
              <li key={payment.id} className={`p-2 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'}`}>
                <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>${payment.amount} - {payment.method}</p>
                <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Date: {payment.date}, Status: {payment.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;