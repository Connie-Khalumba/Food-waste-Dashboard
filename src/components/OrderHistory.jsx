// redifu-dashboard/src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useUser } from '../context/UserContext';

const OrderHistory = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Assume orders are stored in a 'orders' collection with a 'userId' field
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white"
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleDateString()}</p>
              <p><strong>Items:</strong> {order.items?.join(', ') || 'N/A'}</p>
              <p><strong>Total:</strong> ${order.total || '0.00'}</p>
              <p><strong>Status:</strong> {order.status || 'Pending'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;