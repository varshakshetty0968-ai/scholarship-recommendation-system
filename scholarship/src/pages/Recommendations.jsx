import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [matches, setMatches] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`http://localhost:5000/recommend/${studentId}`).then(res => setMatches(res.data));
  }, [studentId]);

  const openInBrowser = (name) => {
    const searchQuery = encodeURIComponent(`${name} scholarship eligibility and application`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const apply = async (name) => {
    await axios.post('http://localhost:5000/apply', { student_id: studentId, scholarship_name: name });
    alert("Application recorded in Dashboard for " + name);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recommended for You</h2>
      {matches.map((name, i) => (
        <div key={i} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
          <h3>{name}</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => openInBrowser(name)} style={{ padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}>
              Read Official Info 🌐
            </button>
            <button onClick={() => apply(name)} style={{ padding: '8px 12px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
              Mark as Applied ✅
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;