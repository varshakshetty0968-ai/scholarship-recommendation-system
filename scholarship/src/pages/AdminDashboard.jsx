import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to the root path which is mapped to Home.jsx
    navigate("/"); 
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <p style={styles.subheading}>System Management & Oversight</p>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        <div style={styles.grid}>
          <button style={styles.card} onClick={() => navigate("/scholarships-manage")}>
            <span style={styles.icon}>🎓</span>
            <div style={styles.cardText}>
              <h3 style={styles.cardTitle}>Manage Scholarships</h3>
              <p style={styles.cardDesc}>Add, edit, or remove scholarship programs</p>
            </div>
          </button>

          <button style={styles.card} onClick={() => navigate("/users")}>
            <span style={styles.icon}>👥</span>
            <div style={styles.cardText}>
              <h3 style={styles.cardTitle}>Manage Students</h3>
              <p style={styles.cardDesc}>View profiles and manage student accounts</p>
            </div>
          </button>

          <button style={styles.card} onClick={() => navigate("/employees-manage")}>
            <span style={styles.icon}>💼</span>
            <div style={styles.cardText}>
              <h3 style={styles.cardTitle}>Manage Employees</h3>
              <p style={styles.cardDesc}>Control verifier access and permissions</p>
            </div>
          </button>

          <button style={styles.card} onClick={() => navigate("/reports")}>
            <span style={styles.icon}>📊</span>
            <div style={styles.cardText}>
              <h3 style={styles.cardTitle}>System Reports</h3>
              <p style={styles.cardDesc}>Analyze application trends and data</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ... styles remain the same
const styles = {
  pageWrapper: {
    width: "100vw",
    minHeight: "100vh",
    background: "#0f172a",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    overflowX: "hidden"
  },
  container: {
    padding: "60px 4%",
    width: "100%",
    boxSizing: "border-box"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "50px"
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#facc15",
    margin: 0
  },
  subheading: {
    color: "#94a3b8",
    fontSize: "1.2rem",
    marginTop: "5px"
  },
  logoutBtn: {
    background: "transparent",
    color: "#ef4444",
    border: "1px solid #ef4444",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    width: "100%"
  },
  card: {
    background: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    cursor: "pointer",
    textAlign: "left",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s"
  },
  icon: {
    fontSize: "40px",
    background: "rgba(250, 204, 21, 0.1)",
    padding: "15px",
    borderRadius: "12px"
  },
  cardText: {
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.4rem",
    color: "white",
    fontWeight: "700"
  },
  cardDesc: {
    margin: "5px 0 0 0",
    color: "#94a3b8",
    fontSize: "0.95rem"
  }
};