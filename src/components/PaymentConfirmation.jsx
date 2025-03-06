// src/components/PaymentConfirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('order_id');

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Payment Confirmation</h2>
      {orderId ? (
        <p>Thank you for your payment! Your order ID is: {orderId}</p>
      ) : (
        <p>Processing your payment...</p>
      )}
    </div>
  );
};

export default PaymentConfirmation;