import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductManager from './pages/ProductManager';
import Orders from './pages/Orders';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={
          <ProtectedRoute><Shop /></ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path="/order-confirmation" element={
          <ProtectedRoute><OrderConfirmation /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}><ProductManager /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute adminOnly={true}><Orders /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
