import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme for isDarkMode
import axios from 'axios';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg'

const Payment = () => {
  const { userRole, user } = useUser();
  const { isDarkMode } = useTheme(); // Destructure isDarkMode from ThemeContext
  const navigate = useNavigate();
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]); // State for payment history

  useEffect(() => {
    if (userRole !== 'organization' || !user) return;

    const initiatePayment = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/create-payment`, {
          email: user.email || 'test@org.com',
          phone: '254712345678',
          firstName: 'Test',
          lastName: 'User',
          description: 'Standard organization subscription fee',
        });
        setPaymentUrl(response.data.paymentUrl);

        // Optionally update payment history (e.g., after confirmation)
        if (response.data.order_tracking_id) {
          setPaymentHistory((prev) => [
            ...prev,
            { id: response.data.order_tracking_id, amount: 1000, date: new Date().toISOString() },
          ]);
        }
      } catch (error) {
        console.error('Payment initiation error:', error);
        setError('Failed to initiate payment. Please try again.');
      }
    };

    initiatePayment();
  }, [userRole, user, navigate]);

  if (userRole !== 'organization') {
    return (
      <div
        className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="p-4">
          <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>Payment options are only available for organizations.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="p-4">
          <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage}/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="p-4">
        <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Make a Payment</h2>
        <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>Standard Organization Subscription Fee: KES 1000</p>
        {paymentUrl ? (
          <a
            href={paymentUrl}
            className={`btn btn-primary mt-2 ${isDarkMode ? 'dark:bg-green-700 dark:hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay Now (KES 1000)
          </a>
        ) : (
          <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>Initializing payment...</p>
        )}

        {/* Display Payment History */}
        {paymentHistory.length > 0 && (
          <div className={`mt-4 ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Payment History</h3>
            <ul>
              {paymentHistory.map((payment, index) => (
                <li
                  key={index}
                  className={`py-2 ${isDarkMode ? 'dark:text-gray-300' : 'text-gray-700'} border-b ${isDarkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}
                >
                  Order ID: {payment.id}, Amount: KES {payment.amount}, Date: {new Date(payment.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;