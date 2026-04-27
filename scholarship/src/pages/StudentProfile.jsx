import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (!student) return (
    <div style={{ ...styles.pageWrapper, justifyContent: "center", alignItems: "center" }}>
      Loading Student Profile...
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back to Users
        </button>
        
        <div style={styles.card}>
          <h2 style={{ color: "#facc15", fontSize: "2rem", marginBottom: "10px" }}>Detailed Information</h2>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>User ID: {id}</p>
          <hr style={styles.divider} />
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Name</span>
              <span style={styles.value}>{student.name}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>{student.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Education</span>
              <span style={styles.value}>{student.education || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Community</span>
              <span style={styles.value}>{student.community || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Religion</span>
              <span style={styles.value}>{student.religion || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Phone</span>
              <span style={styles.value}>{student.phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: "100vw",
    minHeight: "100vh",
    background: "#0f172a",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    color: "white",
    boxSizing: "border-box",
    overflowX: "hidden"
  },
  container: {
    padding: "40px 4%",
    width: "100%",
    boxSizing: "border-box"
  },
  backBtn: { 
    background: "none", 
    border: "1px solid #facc15", 
    color: "#facc15", 
    padding: "10px 20px", 
    cursor: "pointer", 
    borderRadius: "8px",
    fontWeight: "600",
    transition: "0.3s",
    marginBottom: "30px"
  },
  card: { 
    background: "#1e293b", 
    padding: "40px", 
    borderRadius: "16px", 
    width: "100%",
    maxWidth: "800px", // Limits width slightly for readability while staying centered
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  divider: { 
    opacity: 0.1, 
    margin: "20px 0",
    border: "0",
    borderTop: "1px solid white"
  },
  infoGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
    gap: "25px", 
    marginTop: "20px" 
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  label: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  value: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#f1f5f9"
  }
};