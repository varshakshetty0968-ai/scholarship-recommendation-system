import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scholarships = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/scholarships');
        setList(res.data);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load scholarships. Check if the server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const openInBrowser = (name) => {
    const searchQuery = encodeURIComponent(`${name} scholarship official website eligibility`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const filteredScholarships = list.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="scholarships-wrapper">
       <div className="status-message">🔍 Loading scholarship dataset...</div>
    </div>
  );
  
  if (error) return (
    <div className="scholarships-wrapper">
       <div className="status-message error">❌ {error}</div>
    </div>
  );

  return (
    <div className="scholarships-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .scholarships-wrapper {
          min-height: 100vh;
          width: 100vw; /* Spans entire screen width */
          background-color: #041d3d;
          background-image: radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%);
          color: white;
          font-family: 'Inter', sans-serif;
          padding: 60px 5%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin: 0;
        }

        .header-section {
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 25px;
        }

        .header-section h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #facc15; /* Golden Yellow */
          margin: 0;
          letter-spacing: -0.04em;
        }

        .search-container {
          margin: 30px 0;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 18px 25px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1.1rem;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #facc15;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.15);
        }

        .stats-info {
          color: #94a3b8;
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .stats-info strong { color: #facc15; }

        .scholar-list-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }

        .scholar-item {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 25px 35px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scholar-item:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.06);
          border-color: #facc15;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        .scholar-name {
          font-weight: 600;
          font-size: 1.2rem;
          color: #fff;
          flex: 1;
        }

        .details-btn {
          padding: 12px 28px;
          background-color: #facc15;
          color: #041d3d;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          margin-left: 20px;
        }

        .details-btn:hover {
          background-color: #fbbf24;
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(250, 204, 21, 0.4);
        }

        .status-message {
          text-align: center;
          padding-top: 100px;
          font-size: 1.2rem;
          color: #94a3b8;
        }
        
        .error { color: #ef4444; }

        @media (max-width: 768px) {
          .scholar-item { flex-direction: column; align-items: flex-start; gap: 20px; }
          .details-btn { margin-left: 0; width: 100%; }
          .header-section h2 { font-size: 1.8rem; }
        }
      `}</style>

      <div className="header-section">
        <h2>Browse All Scholarships</h2>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name (e.g. INSPIRE, Post-Matric)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" 
        />
      </div>

      <p className="stats-info">
        Total unique scholarships found: <strong>{filteredScholarships.length}</strong>
      </p>

      <div className="scholar-list-container">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((name, i) => (
            <div key={i} className="scholar-item">
              <span className="scholar-name">{name}</span>
              <button onClick={() => openInBrowser(name)} className="details-btn">
                Details ↗
              </button>
            </div>
          ))
        ) : (
          <div className="status-message">No scholarships match "{searchTerm}"</div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;