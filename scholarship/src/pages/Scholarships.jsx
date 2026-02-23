import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scholarships = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/scholarships').then(res => setList(res.data));
  }, []);

  // Function to open the scholarship in a real browser search
  const openInBrowser = (name) => {
    const searchQuery = encodeURIComponent(`${name} scholarship official website`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Browse All Scholarships</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {list.map((name, i) => (
          <li key={i} style={{ 
            padding: '15px', 
            borderBottom: '1px solid #ddd', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center' 
          }}>
            <span>{name}</span>
            <button 
              onClick={() => openInBrowser(name)}
              style={{ padding: '5px 15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              View Details ↗
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scholarships;