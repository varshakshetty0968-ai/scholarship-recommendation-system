import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Toggle Account Status logic
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Inactive" ? "Active" : "Inactive";
    
    try {
      const res = await fetch(`http://localhost:5000/employees/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountStatus: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update local state immediately
        setEmployees(prev => 
          prev.map(e => e._id === id ? { ...e, accountStatus: newStatus } : e)
        );
      } else {
        alert("Failed to update employee status in database.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server connection failed.");
    }
  };

  const deleteEmp = async (id) => {
    if (window.confirm("⚠️ Permanent Action: Delete this employee account?")) {
      const res = await fetch(`http://localhost:5000/employees/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEmployees(employees.filter((e) => e._id !== id));
      }
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>Employee Management</h1>
          <p style={styles.subtext}>Control administrative access and staff credentials</p>
        </div>
      </header>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>EMPLOYEE NAME</th>
              <th style={styles.th}>EMAIL ADDRESS</th>
              <th style={styles.th}>ACCESS STATUS</th>
              <th style={{ ...styles.th, textAlign: "right" }}>ADMIN ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e._id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.nameText}>{e.name}</div>
                  <div style={styles.idSubtext}>ID: {e._id.slice(-6).toUpperCase()}</div>
                </td>
                <td style={styles.td}>{e.email}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(e.accountStatus === "Inactive" ? styles.inactiveBadge : styles.activeBadge)
                  }}>
                    ● {e.accountStatus || "Active"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button
                    onClick={() => toggleStatus(e._id, e.accountStatus || "Active")}
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: e.accountStatus === "Inactive" ? "#10b981" : "#ef4444"
                    }}
                  >
                    {e.accountStatus === "Inactive" ? "Activate" : "Deactivate"}
                  </button>
                  <button onClick={() => navigate(`/employee-profile/${e._id}`)} style={styles.viewBtn}>View</button>
                  <button onClick={() => deleteEmp(e._id)} style={styles.delBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { minHeight: "100vh", width: "100vw", backgroundColor: "#000", color: "white", padding: "60px 0" },
  header: { padding: "0 4%", marginBottom: "40px" },
  heading: { fontSize: "2.5rem", fontWeight: "800", margin: 0, letterSpacing: "-1px" },
  subtext: { color: "#475569", marginTop: "8px" },
  tableContainer: { width: "100%", background: "#0b0f1a", borderTop: "1px solid #1e293b" },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { background: "#020617" },
  th: { padding: "18px 4%", fontSize: "11px", fontWeight: "700", color: "#475569", letterSpacing: "1.2px", textTransform: "uppercase" },
  tr: { borderBottom: "1px solid #111827" },
  td: { padding: "20px 4%", fontSize: "14px", color: "#cbd5e1" },
  nameText: { fontWeight: "600", color: "#f8fafc" },
  idSubtext: { fontSize: "10px", color: "#475569", marginTop: "4px" },
  statusBadge: { padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" },
  activeBadge: { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  inactiveBadge: { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" },
  actionBtn: { padding: "8px 14px", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600", marginRight: "8px", minWidth: "100px" },
  viewBtn: { padding: "8px 14px", background: "#334155", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600", marginRight: "8px" },
  delBtn: { padding: "8px 14px", background: "transparent", color: "#475569", border: "1px solid #334155", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }
};