// redifu-dashboard/src/components/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg';
import { db } from '../firebase'; // Import Firestore
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Payment = () => {
  const { userRole, user } = useUser();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState({}); // Track order statuses

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

        // Save order to Firestore
        if (response.data.order_tracking_id) {
          const orderData = {
            userId: user.uid,
            createdAt: new Date(),
            items: ['Organization Subscription'], // Customize items as needed
            total: 1000, // KES 1000 as per the UI
            status: 'Pending', // Initial status
            orderTrackingId: response.data.order_tracking_id, // Link to payment tracking ID
          };
          const orderRef = await addDoc(collection(db, 'orders'), orderData);
          console.log('Order saved with ID:', orderRef.id);

          // Update payment history
          setPaymentHistory((prev) => [
            ...prev,
            { id: response.data.order_tracking_id, amount: 1000, date: new Date().toISOString(), orderId: orderRef.id },
          ]);

          // Initialize tracking status
          setTrackingStatus((prev) => ({
            ...prev,
            [response.data.order_tracking_id]: 'Pending',
          }));
        }
      } catch (error) {
        console.error('Payment initiation error:', error);
        setError('Failed to initiate payment. Please try again.');
      }
    };

    initiatePayment();
  }, [userRole, user, navigate]);

  // Function to update order status (simulated for now)
  const checkOrderStatus = async (orderTrackingId, orderId) => {
    try {
      // Simulate tracking by checking Firestore (replace with API call if needed)
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (orderDoc.exists()) {
        const status = orderDoc.data().status;
        setTrackingStatus((prev) => ({
          ...prev,
          [orderTrackingId]: status,
        }));
        if (status === 'Completed') {
          alert(`Order ${orderTrackingId} has been completed!`);
        }
      }
    } catch (error) {
      console.error('Error checking order status:', error.message);
    }
  };

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
        backgroundImage: `url(${backgroundImage})`, // Fixed backgroundImage path
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

        {/* Display Payment History with Tracking */}
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
                  <button
                    onClick={() => checkOrderStatus(payment.id, payment.orderId)}
                    className={`ml-4 px-2 py-1 rounded ${isDarkMode ? 'dark:bg-blue-600 dark:hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    Track Order
                  </button>
                  <span className="ml-2">
                    Status: {trackingStatus[payment.id] || 'Unknown'}
                  </span>
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