import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Applications from './pages/Applications';
import Scholarships from './pages/Scholarships';

// This component decides whether to show the Navbar
const Navigation = () => {
  const location = useLocation();
  
  // Define paths where the navbar should NOT be visible
  const hideNavbarPaths = ["/", "/register"];

  // If the current path is in our hide list, return nothing
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav style={{ background: '#333', padding: '10px', display: 'flex', gap: '15px' }}>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/dashboard">Dashboard</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/recommendations">My Matches</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/applications">My Applications</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/scholarships">All Scholarships</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      {/* The Navigation component is now inside the Router but outside Routes */}
      <Navigation />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/scholarships" element={<Scholarships />} />
      </Routes>
    </Router>
  );
}