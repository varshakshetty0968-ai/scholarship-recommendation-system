import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`http://localhost:5000/applications/${studentId}`).then(res => setApps(res.data));
  }, [studentId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Applications</h2>
      {apps.map((app) => (
        <div key={app._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <strong>{app.scholarship_name}</strong>
          <p>Status: <span style={{ color: 'orange' }}>{app.status}</span></p>
          <small>Applied: {new Date(app.appliedAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};
export default Applications;