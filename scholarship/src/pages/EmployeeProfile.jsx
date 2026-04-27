import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeProfile() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/employees/${id}`).then(res => res.json()).then(setEmp);
  }, [id]);

  if (!emp) return <div style={{ color: "white", padding: 40 }}>Loading Profile...</div>;

  return (
    <div style={{ width: "100vw", minHeight: "100vh", padding: "40px 4%", boxSizing: "border-box" }}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.card}>
        <h2 style={{ color: "#facc15", fontSize: "2rem", marginBottom: "20px" }}>Employee Profile</h2>
        <div style={styles.grid}>
          <p><strong>Name:</strong> {emp.name}</p>
          <p><strong>Email:</strong> {emp.email}</p>
          <p><strong>Role:</strong> {emp.role || "Verifier"}</p>
          <p><strong>ID:</strong> {id}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  back: { background: "none", border: "1px solid #facc15", color: "#facc15", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" },
  card: { background: "#1e293b", padding: "40px", borderRadius: "12px", color: "white", maxWidth: "800px", border: "1px solid rgba(255,255,255,0.1)" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", fontSize: "1.2rem" }
};