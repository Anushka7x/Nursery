// === src/pages/Login.js ===
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', isAdmin: false });
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isRegister) {
      if (users.find(u => u.email === form.email)) return alert('Email already registered.');
      users.push(form);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registered! Now login.');
      setIsRegister(false);
    } else {
      const match = users.find(u => u.email === form.email && u.password === form.password);
      if (!match) return alert('Invalid credentials');
      localStorage.setItem('currentUser', JSON.stringify(match));
      alert('Login successful');
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      {isRegister && (
        <label>
          <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
          Register as Admin
        </label>
      )}
      <button onClick={handleSubmit}>{isRegister ? 'Register' : 'Login'}</button>
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
        {isRegister ? 'Already have an account? Login' : 'New here? Register'}
      </p>
    </div>
  );
};

export default Login;
