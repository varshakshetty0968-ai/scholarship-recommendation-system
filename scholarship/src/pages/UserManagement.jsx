import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users on load
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    // Determine the next state based on the 'accountStatus' key
    const newStatus = currentStatus === "Inactive" ? "Active" : "Inactive";
    
    try {
      const res = await fetch(`http://localhost:5000/students/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountStatus: newStatus }), 
      });

      const data = await res.json();

      // IMPORTANT: Only update UI if Backend confirms success: true
      if (res.ok && data.success) {
        setUsers(prevUsers => 
          prevUsers.map(u => u._id === id ? { ...u, accountStatus: newStatus } : u)
        );
      } else {
        alert("Database update failed. Check your Backend logic.");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to the server.");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("⚠️ Permanent Action: Delete this user?")) {
      const res = await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
      if (res.ok) setUsers(users.filter((u) => u._id !== id));
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.heading}>User Management</h1>
        <p style={styles.subtext}>Account control and status monitoring</p>
      </header>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>STUDENT NAME</th>
              <th style={styles.th}>EMAIL ADDRESS</th>
              <th style={styles.th}>ACCOUNT STATUS</th>
              <th style={{ ...styles.th, textAlign: "right" }}>ADMIN ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.userName}>{u.name}</div>
                  <div style={styles.userId}>ID: {u._id.slice(-6).toUpperCase()}</div>
                </td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(u.accountStatus === "Inactive" ? styles.inactiveBadge : styles.activeBadge)
                  }}>
                    ● {u.accountStatus || "Active"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button
                    onClick={() => toggleStatus(u._id, u.accountStatus || "Active")}
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: u.accountStatus === "Inactive" ? "#10b981" : "#ef4444"
                    }}
                  >
                    {u.accountStatus === "Inactive" ? "Activate" : "Deactivate"}
                  </button>
                  <button onClick={() => navigate(`/user-profile/${u._id}`)} style={styles.viewBtn}>View</button>
                  <button onClick={() => deleteUser(u._id)} style={styles.deleteBtn}>Delete</button>
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
  heading: { fontSize: "2.5rem", fontWeight: "800", margin: 0 },
  subtext: { color: "#64748b", marginTop: "8px" },
  tableContainer: { width: "100%", background: "#0b0f1a", borderTop: "1px solid #1e293b" },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { background: "#020617" },
  th: { padding: "18px 4%", fontSize: "11px", fontWeight: "700", color: "#475569", letterSpacing: "1.2px", textTransform: "uppercase" },
  tr: { borderBottom: "1px solid #111827" },
  td: { padding: "20px 4%", fontSize: "14px", color: "#cbd5e1" },
  userName: { fontWeight: "600", color: "#f8fafc" },
  userId: { fontSize: "10px", color: "#475569", marginTop: "4px" },
  statusBadge: { padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" },
  activeBadge: { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  inactiveBadge: { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" },
  actionBtn: { padding: "8px 14px", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600", marginRight: "8px", minWidth: "100px", transition: "0.2s" },
  viewBtn: { padding: "8px 14px", background: "#334155", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600", marginRight: "8px" },
  deleteBtn: { padding: "8px 14px", background: "transparent", color: "#475569", border: "1px solid #334155", cursor: "pointer", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }
};