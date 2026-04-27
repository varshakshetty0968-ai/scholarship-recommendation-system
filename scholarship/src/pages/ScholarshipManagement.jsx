import React, { useEffect, useState } from "react";

export default function ScholarshipManagement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/scholarships")
      .then(res => res.json())
      .then(d => {
        // Log this to your console to see what the backend is actually sending!
        console.log("Scholarship Data:", d);
        setData(d);
      });
  }, []);

  const deleteScholarship = async (id) => {
    if (!window.confirm("Delete this scholarship?")) return;
    await fetch(`http://localhost:5000/scholarships/${id}`, { method: "DELETE" });
    setData(prev => prev.filter(s => (s._id || s) !== id));
  };

  const updateScholarship = async (id, currentName) => {
    const newName = prompt("Enter new scholarship name", currentName);
    if (!newName) return;

    await fetch(`http://localhost:5000/scholarships/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: newName }),
    });

    setData(prev => prev.map(s => (s._id === id ? { ...s, Name: newName } : s)));
  };

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.heading}>Scholarship Management</h1>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Scholarship Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => {
              // This logic ensures the name shows up even if it's a string or an object
              const sName = typeof s === "string" ? s : (s.Name || s.name || "Unnamed");
              const sId = s._id || i;

              return (
                <tr key={sId} style={styles.tr}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>{sName}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => updateScholarship(sId, sName)} 
                      style={styles.updateBtn}
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => deleteScholarship(sId)} 
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: "100vw",
    minHeight: "100vh",
    padding: "40px 0",
    background: "#0f172a",
    color: "white",
    boxSizing: "border-box"
  },
  heading: { fontSize: "2.5rem", paddingLeft: "4%", marginBottom: "30px" },
  tableContainer: { width: "100%", background: "#1e293b" },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { background: "#334155", textAlign: "left" },
  th: { padding: "20px 4%", color: "#cbd5e1", borderBottom: "2px solid #475569" },
  tr: { borderBottom: "1px solid #334155" },
  td: { padding: "20px 4%", color: "#f1f5f9" },
  updateBtn: { 
    padding: "8px 16px", 
    background: "white", 
    color: "black", 
    border: "none", 
    borderRadius: "6px", 
    marginRight: "10px", 
    cursor: "pointer", 
    fontWeight: "600" 
  },
  deleteBtn: { 
    padding: "8px 16px", 
    background: "#dc2626", 
    color: "white", 
    border: "none", 
    borderRadius: "6px", 
    cursor: "pointer", 
    fontWeight: "600" 
  }
};