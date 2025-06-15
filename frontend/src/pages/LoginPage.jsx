// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    console.log('Login response:', response.data);

    // to store dATA in localStorage
    const user = response.data.user;
    const userId = user?.id;
    const isAdmin = user?.isAdmin;

   if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('isAdmin', isAdmin); 
      alert('Login successful');

      if (isAdmin) {
        navigate('/admin'); 
      } else {
        navigate('/home');
      }
    } else {
      alert('Login failed: Invalid user data');
    }

  } catch (err) {
    console.error('Login error:', err);
    alert('Login failed: ' + (err.response?.data?.message || 'Server error'));
  }
};

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
