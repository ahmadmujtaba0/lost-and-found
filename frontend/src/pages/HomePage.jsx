// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to the Lost & Found System</h2>
      <div className="nav-buttons">
        <button onClick={() => navigate('/report-lost')}>Report Lost Item</button>
        <button onClick={() => navigate('/report-found')}>Report Found Item</button>
        <button onClick={() => navigate('/admin')}>Admin Page</button>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
