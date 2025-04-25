// === src/components/Navbar.js ===
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
    const interval = setInterval(() => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(updatedCart.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Paradise Nursery</Link>
      <div className="nav-links">
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
        <Link to="/checkout">Checkout</Link>

        {user ? (
          <>
            <span className="user-role">{user.isAdmin ? 'Admin' : 'User'}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;