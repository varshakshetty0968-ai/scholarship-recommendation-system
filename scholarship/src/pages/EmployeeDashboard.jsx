import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  
  const employeeName = localStorage.getItem("employeeName") || "Admin User";
  const employeeId = localStorage.getItem("employeeId") || "N/A";

  useEffect(() => {
    fetch("http://localhost:5000/admin/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.log("Dashboard Error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    localStorage.removeItem("employeeName");
    navigate("/"); 
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return styles.statusApproved;
      case "Rejected": return styles.statusRejected;
      default: return styles.statusPending;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Scholarship Review</h1>
            <p style={styles.subGreeting}>Logged in as {employeeName}</p>
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <div style={styles.counterCard}>
              <span style={styles.counterLabel}>ACTIVE APPLICATIONS</span>
              <span style={styles.counterValue}>{applications.length}</span>
            </div>
            <button onClick={handleLogout} style={styles.topLogoutBtn}>
              Sign Out
            </button>
          </div>
        </header>

        <div style={styles.tableWrapper}>
          <div style={styles.tableHeader}>
            <span>APPLICANT</span>
            <span>SCHOLARSHIP PROGRAM</span>
            <span>STATUS</span>
            <span style={{ textAlign: "right" }}>VERIFICATION</span>
          </div>

          {applications.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>✨</div>
              <p>Your queue is empty.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app._id} style={styles.appRow}>
                <div style={styles.applicantName}>
                    {app.student_details?.fullName || app.name || "N/A"}
                    <div style={styles.idSubtext}>REF: {app._id.slice(-6).toUpperCase()}</div>
                </div>
                
                <div style={styles.appName}>{app.scholarship_name}</div>
                
                <div>
                  <span style={{...styles.statusBadge, ...getStatusStyle(app.status)}}>
                    ● {app.status}
                  </span>
                </div>
                
                <div style={{ textAlign: "right" }}>
                  <Link to={`/verify/${app._id}`} style={styles.verifyBtn}>
                    Verify Data
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: { 
    display: "block", 
    minHeight: "100vh", 
    backgroundColor: "#000000", // Complete Black
    color: "#ffffff",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
  },
  mainContent: { 
    maxWidth: "1100px", 
    margin: "0 auto", 
    padding: "60px 20px" 
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "50px"
  },
  greeting: { 
    fontSize: "32px", 
    fontWeight: "800", 
    color: "#ffffff", 
    margin: 0,
    letterSpacing: "-1px"
  },
  subGreeting: { color: "#666666", margin: "5px 0 0 0", fontSize: "14px" },
  
  counterCard: { 
    textAlign: "right", 
    paddingRight: "20px",
    borderRight: "1px solid #333"
  },
  counterLabel: { display: "block", color: "#666666", fontSize: "10px", fontWeight: "700", letterSpacing: "1px" },
  counterValue: { fontSize: "24px", fontWeight: "800", color: "#fbbf24" }, // Gold accent
  
  topLogoutBtn: { 
    backgroundColor: "transparent", 
    color: "#ffffff", 
    padding: "8px 16px", 
    borderRadius: "4px", 
    border: "1px solid #333", 
    cursor: "pointer", 
    fontSize: "13px",
    transition: "all 0.2s ease"
  },

  tableWrapper: { 
    border: "1px solid #222", 
    borderRadius: "12px",
    overflow: "hidden" 
  },
  tableHeader: { 
    display: "grid", 
    gridTemplateColumns: "1.2fr 1.5fr 0.8fr 0.8fr", 
    padding: "15px 30px", 
    backgroundColor: "#111111", 
    color: "#444444", 
    fontSize: "11px", 
    fontWeight: "700", 
    letterSpacing: "1px"
  },
  appRow: { 
    display: "grid", 
    gridTemplateColumns: "1.2fr 1.5fr 0.8fr 0.8fr", 
    alignItems: "center", 
    padding: "25px 30px", 
    borderBottom: "1px solid #111", 
    backgroundColor: "#000000"
  },
  applicantName: { fontWeight: "600", fontSize: "15px" },
  idSubtext: { fontSize: "10px", color: "#444", marginTop: "4px" },
  appName: { fontWeight: "400", color: "#999", fontSize: "14px" },
  
  statusBadge: { 
    padding: "4px 12px", 
    borderRadius: "4px", 
    fontSize: "11px", 
    fontWeight: "700", 
    display: "inline-flex", 
    alignItems: "center", 
    gap: "6px" 
  },
  statusPending: { backgroundColor: "#1a1600", color: "#fbbf24", border: "1px solid #453700" },
  statusApproved: { backgroundColor: "#051a10", color: "#34d399", border: "1px solid #0a3321" },
  statusRejected: { backgroundColor: "#1a0505", color: "#f87171", border: "1px solid #330a0a" },
  
  verifyBtn: { 
    backgroundColor: "#ffffff", 
    color: "#000000", 
    padding: "10px 20px", 
    borderRadius: "6px", 
    fontSize: "12px", 
    fontWeight: "700", 
    textDecoration: "none" 
  },
  emptyState: { padding: "100px", textAlign: "center", color: "#333" }
};

export default EmployeeDashboard;