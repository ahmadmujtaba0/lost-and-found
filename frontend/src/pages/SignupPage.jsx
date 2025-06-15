// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
  console.log('Signup response:', res.data); // Debug log

  // Optionally store token in localStorage
  localStorage.setItem('token', res.data.token);

  alert('Signup successful!');
  navigate('/'); // Go to login or dashboard
} catch (err) {
  console.error("Signup error:", err);
  alert('Signup failed: ' + (err.response?.data?.message || err.message || 'Unknown error'));
}
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default SignupPage;
