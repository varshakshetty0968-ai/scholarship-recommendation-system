import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:5000/applications/${studentId}`)
        .then(res => {
          setApps(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching applications:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [studentId]);

  if (loading) return (
    <div className="app-page-wrapper">
      <div className="loader">Synchronizing your application records...</div>
    </div>
  );

  return (
    <div className="app-page-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .app-page-wrapper {
          min-height: 100vh;
          width: 100vw;
          background-color: #041d3d;
          background-image: radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%);
          color: white;
          font-family: 'Inter', sans-serif;
          padding: 60px 5%;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .header-box {
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
        }

        .header-box h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #facc15; /* Golden Yellow */
          margin: 0;
          letter-spacing: -0.04em;
        }

        .apps-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .app-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-card:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.06);
          border-color: #facc15;
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
        }

        .info-content h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #fff;
        }

        .info-content p {
          color: #94a3b8;
          font-size: 0.95rem;
          margin: 0;
        }

        .status-badge {
          padding: 8px 18px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid transparent;
        }

        /* Dynamic Status Colors */
        .status-approved { 
          background: rgba(16, 185, 129, 0.15); 
          color: #10b981; 
          border-color: rgba(16, 185, 129, 0.3); 
        }
        .status-pending { 
          background: rgba(250, 204, 21, 0.1); 
          color: #facc15; 
          border-color: rgba(250, 204, 21, 0.3); 
        }
        .status-rejected { 
          background: rgba(239, 68, 68, 0.15); 
          color: #ef4444; 
          border-color: rgba(239, 68, 68, 0.3); 
        }

        .empty-view {
          text-align: center;
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 24px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .loader {
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #94a3b8;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .app-card { flex-direction: column; align-items: flex-start; gap: 20px; }
          .header-box h2 { font-size: 1.8rem; }
        }
      `}</style>

      <header className="header-box">
        <h2>My Applied Scholarships</h2>
      </header>
      
      {apps.length === 0 ? (
        <div className="empty-view">
          <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
            No applications found. Explore schemes to start your journey!
          </p>
        </div>
      ) : (
        <div className="apps-grid">
          {apps.map((app) => (
            <div key={app._id} className="app-card">
              <div className="info-content">
                <h3>{app.scholarship_name}</h3>
                <p>
                  Submission Date: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              
              <div className={`status-badge status-${(app.status || "Pending").toLowerCase()}`}>
                {app.status || "Pending"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;