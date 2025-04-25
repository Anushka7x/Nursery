import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const orderId = Math.floor(100000 + Math.random() * 900000); // Simulated order ID

  return (
    <div className="order-confirmation">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> #{orderId}</p>
      <p>We have sent a confirmation email with your order details.</p>
      <Link to="/shop" className="btn">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmation;
