// === src/components/ProtectedRoute.js ===
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
