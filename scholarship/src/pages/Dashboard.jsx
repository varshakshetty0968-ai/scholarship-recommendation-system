import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const name = localStorage.getItem('studentName');
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {name}!</h1>
      <p>Explore scholarships tailored specifically for your profile.</p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/recommendations"><button style={{ padding: '15px' }}>View Recommended Scholarships</button></Link>
        <Link to="/applications"><button style={{ padding: '15px' }}>Track My Applications</button></Link>
      </div>
    </div>
  );
};
export default Dashboard;