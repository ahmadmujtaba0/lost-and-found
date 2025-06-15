import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ReportLostPage from './pages/ReportLostPage';
import ReportFoundPage from './pages/ReportFoundPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/report-lost" element={<ReportLostPage />} />
      <Route path="/report-found" element={<ReportFoundPage />} />
      <Route path="/admin" element={<AdminPanel />} />

    </Routes>
  );
}

export default App;
