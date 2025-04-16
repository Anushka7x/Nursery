import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-dropdown">
      <div onClick={() => setOpen(!open)} className="profile-icon">👤</div>
      {open && (
        <div className="dropdown-menu">
          <Link to="/profile">Profile</Link>
          <Link to="/account">My Account</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/manage-products">Manage Products</Link>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;