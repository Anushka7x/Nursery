// === src/pages/Orders.js ===
import React, { useEffect, useState } from 'react';
import './Orders.css';

const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(stored);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="orders-container">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>₹{order.price}</td>
                <td>{order.date}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(idx, e.target.value)}
                  >
                    {statusOptions.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="user-management">
  <h2>Registered Users</h2>
  <ul>
    {(JSON.parse(localStorage.getItem('users')) || []).map((user, i) => (
      <li key={i}>
        <strong>{user.email}</strong> - {user.isAdmin ? 'Admin' : 'User'}
        <button onClick={() => {
          const users = JSON.parse(localStorage.getItem('users')) || [];
          users.splice(i, 1);
          localStorage.setItem('users', JSON.stringify(users));
          window.location.reload();
        }}>Delete</button>
      </li>
    ))}
  </ul>
</div>
    </div>
    
  );
};

export default Orders;
