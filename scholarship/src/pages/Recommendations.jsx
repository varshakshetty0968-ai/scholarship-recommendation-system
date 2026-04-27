import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Recommendations = () => {
  const [matches, setMatches] = useState([]);
  const [studentData, setStudentData] = useState(null); // 🔥 NEW: Store the student's details
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      // 🔥 Fetch BOTH the matching scholarships AND the student's profile data simultaneously
      Promise.all([
        axios.get(`http://localhost:5000/recommend/${studentId}`),
        axios.get(`http://localhost:5000/students/${studentId}`)
      ])
      .then(([recommendRes, studentRes]) => {
        // Handle Scholarships
        const uniqueMatches = Array.from(
          new Map(recommendRes.data.map((item) => [item.Name, item])).values()
        );
        setMatches(uniqueMatches); 
        
        // Handle Student Data
        setStudentData(studentRes.data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [studentId]);

  const handleApplyClick = (name) => {
    navigate('/apply-form', { state: { scholarshipName: name } });
  };

  if (loading) return (
    <div className="recommend-wrapper">
       <div className="loader-container">🔍 Analyzing your registered profile...</div>
    </div>
  );

  return (
    <div className="recommend-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .recommend-wrapper {
          min-height: 100vh;
          width: 100vw;
          background-color: #041d3d;
          background-image: radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%);
          color: white;
          font-family: 'Inter', sans-serif;
          padding: 40px 4%;
          box-sizing: border-box;
          margin: 0;
          overflow-x: hidden;
        }

        .header-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 25px;
          width: 100%;
        }

        .header-box h2 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #facc15;
          margin: 0;
          letter-spacing: -0.04em;
        }

        .back-link {
          background: rgba(255, 255, 255, 0.05);
          padding: 10px 20px;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }

        .back-link:hover { 
          color: #facc15; 
          background: rgba(255, 255, 255, 0.1);
          border-color: #facc15;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: 1fr; 
          gap: 20px;
          width: 100%;
        }

        .scholar-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 35px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        .scholar-card:hover {
          transform: scale(1.01);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(250, 204, 21, 0.5);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }

        .info-section { flex: 1; }

        .info-section h3 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 20px 0;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .meta-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }

        .meta-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: #94a3b8;
        }

        .meta-pill strong { color: #facc15; font-weight: 600; }

        .apply-btn {
          background: #facc15;
          color: #041d3d;
          padding: 18px 45px;
          border: none;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          margin-left: 40px;
          box-shadow: 0 10px 20px -5px rgba(250, 204, 21, 0.3);
        }

        .apply-btn:hover {
          background: #fbbf24;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px -5px rgba(250, 204, 21, 0.5);
        }

        .loader-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 600;
          color: #facc15;
          background: #041d3d;
        }

        @media (max-width: 1024px) {
          .scholar-card { flex-direction: column; align-items: flex-start; gap: 25px; padding: 25px; }
          .apply-btn { width: 100%; margin-left: 0; }
        }
      `}</style>

      <div className="header-box">
        <h2>Scholarships For You</h2>
        <Link to="/dashboard" className="back-link">← Dashboard</Link>
      </div>
      
      {matches.length === 0 ? (
        <div style={{textAlign: 'center', padding: '100px 0'}}>
          <p style={{ fontSize: '1.4rem', color: '#94a3b8' }}>No unique matches found.</p>
        </div>
      ) : (
        <div className="matches-grid">
          {matches.map((item, i) => (
            <div key={i} className="scholar-card">
              <div className="info-section">
                <h3>{item.Name}</h3>
                <div className="meta-info">
                  <div className="meta-pill">
                    <span>🎓 <strong>Qualification:</strong> {item["Education Qualification"]}</span>
                  </div>
                  <div className="meta-pill">
                    <span>👤 <strong>Gender:</strong> {item.Gender || "Any"}</span>
                  </div>
                  <div className="meta-pill">
                    <span>👥 <strong>Community:</strong> {item.Community}</span>
                  </div>
                  <div className="meta-pill">
                    <span>🕉️ <strong>Religion:</strong> {item.Religion}</span>
                  </div>
                  <div className="meta-pill">
                    <span>♿ <strong>Disability:</strong> {item.Disability}</span>
                  </div>
                  <div className="meta-pill">
                    <span>🏆 <strong>Sports Person:</strong> {item.Sports || "No"}</span>
                  </div>
                  
                  {/* 🔥 UPDATED: Label changed back to Family Income */}
                  <div className="meta-pill">
                    <span>💰 <strong>Family Income:</strong> ₹{studentData?.income || "0"}</span>
                  </div>

                </div>
              </div>

              <button 
                className="apply-btn"
                onClick={() => handleApplyClick(item.Name)} 
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;