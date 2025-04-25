// === src/pages/Cart.js ===
import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Set default quantity = 1 if not already set
    const updatedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updated = [...cartItems];
    updated[index].quantity = parseInt(newQuantity);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const date = new Date().toLocaleDateString();

    const newOrders = cartItems.map((item, i) => ({
      id: `ORD${Date.now()}${i}`,
      name: item.name,
      price: item.price * item.quantity,
      date,
      status: "Pending",
    }));

    localStorage.setItem('orders', JSON.stringify([...orders, ...newOrders]));
    localStorage.removeItem('cart');
    alert("Order placed successfully!");
    window.location.href = "/order-confirmation"; // or use navigate if using react-router
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </label>
                </div>
                <button onClick={() => handleRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Subtotal: ₹{getTotal()}</h3>
            <button className="checkout-btn" onClick={() => window.location.href = '/checkout'}>
  Proceed to Checkout
</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
