import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      axios.get(`http://localhost:5000/applications/${userId}`)
        .then(res => {
          setApps(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching dashboard data:", err);
          setLoading(false);
        });
    }
  }, [userId, navigate]);

  const stats = [
    { 
      label: "Total Applied", 
      count: apps.length, 
      icon: "📝", 
      color: "#00d4ff", // Electric Cyan
      glow: "rgba(0, 212, 255, 0.2)"
    },
    { 
      label: "Approved", 
      count: apps.filter(a => a.status === "Approved" || a.status === "Verified").length, 
      icon: "✨", 
      color: "#00ff88", // Neon Emerald
      glow: "rgba(0, 255, 136, 0.2)"
    },
    { 
      label: "Pending", 
      count: apps.filter(a => !a.status || a.status === "Pending").length, 
      icon: "⏳", 
      color: "#ffb800", // Bright Amber
      glow: "rgba(255, 184, 0, 0.2)"
    },
    { 
      label: "Rejected", 
      count: apps.filter(a => a.status === "Rejected").length, 
      icon: "🚫", 
      color: "#ff2e63", // Radiant Rose
      glow: "rgba(255, 46, 99, 0.2)"
    }
  ];

  return (
    <div className="dashboard-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .dashboard-container {
          min-height: 100vh;
          width: 100vw;
          background-color: #0a0b1e; /* Deeper Midnight Blue */
          background-image: 
            radial-gradient(circle at 0% 0%, rgba(76, 0, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(0, 212, 255, 0.1) 0%, transparent 40%);
          color: #e2e8f0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          box-sizing: border-box;
          padding: 60px 8%;
          flex-direction: column;
        }

        .header-section { margin-bottom: 50px; border-left: 5px solid #00d4ff; padding-left: 20px; }
        .header-section h1 { 
          font-size: 2.8rem; 
          font-weight: 800; 
          margin: 0 0 10px 0; 
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .user-id-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #00d4ff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          width: 100%;
          margin-bottom: 60px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 30px;
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover { 
          transform: translateY(-10px); 
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }

        .stat-icon { font-size: 2rem; margin-bottom: 15px; display: block; filter: drop-shadow(0 0 8px currentColor); }
        .stat-count { font-size: 2.5rem; font-weight: 800; display: block; margin-bottom: 5px; color: #fff; }
        .stat-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.7; }

        .section-title { 
            font-size: 1.6rem; 
            font-weight: 700; 
            color: #fff; 
            margin-bottom: 30px; 
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .section-title::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

        .scholarship-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          padding: 20px 30px;
          margin-bottom: 15px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.3s;
        }

        .scholarship-card:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(0, 212, 255, 0.3); }

        .status-badge {
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-approved { background: rgba(0, 255, 136, 0.1); color: #00ff88; border: 1px solid #00ff88; }
        .status-pending { background: rgba(255, 184, 0, 0.1); color: #ffb800; border: 1px solid #ffb800; }
        .status-rejected { background: rgba(255, 46, 99, 0.1); color: #ff2e63; border: 1px solid #ff2e63; }

        @media (max-width: 768px) {
          .dashboard-container { padding: 40px 20px; }
          .scholarship-card { flex-direction: column; align-items: flex-start; gap: 15px; }
          .header-section h1 { font-size: 2.2rem; }
        }
      `}</style>

      <div className="header-section">
        <div className="user-id-badge">AUTHENTICATED USER • {userId?.slice(-6)}</div>
        <h1>Portal Dashboard</h1>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderBottom: `4px solid ${stat.color}` }}>
            <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
            <span className="stat-count">{stat.count}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="history-section">
        <h2 className="section-title">Application Timeline</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner"></div>
            <p style={{ color: '#64748b', marginTop: '10px' }}>Synchronizing secure records...</p>
          </div>
        ) : apps.length === 0 ? (
          <div className="scholarship-card" style={{ justifyContent: 'center', opacity: 0.6 }}>
            <p>No active scholarship records found in your profile.</p>
          </div>
        ) : (
          apps.map((app) => (
            <div key={app._id} className="scholarship-card">
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '600' }}>{app.scholarship_name}</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
                   RECORD_ID: {app._id?.slice(-8).toUpperCase()} • {app.appliedAt ? new Date(app.appliedAt).toDateString() : "DATE_UNKNOWN"}
                </p>
              </div>
              <div className={`status-badge status-${(app.status || "Pending").toLowerCase()}`}>
                {app.status || "Pending"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;