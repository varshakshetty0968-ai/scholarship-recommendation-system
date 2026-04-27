import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        nav("/admin-dashboard");
      } else {
        alert(data.message || "Login Failed ❌");
      }
    } catch (err) {
      alert("Server connection failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      {/* Inline CSS for the focus and hover states */}
      <style>{`
        input:focus {
          border-color: #6366f1 !important;
          background: #000 !important;
          outline: none;
        }
        button:hover {
          background: #f8fafc !important;
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(0);
        }
      `}</style>

      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.icon}>🔐</div>
          <h2 style={styles.title}>Admin Portal</h2>
          <p style={styles.subtitle}>Secure Scholarship Management</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>OFFICIAL EMAIL</label>
          <input
            name="email"
            placeholder="admin@institution.edu"
            onChange={change}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>PASSWORD</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={change}
            style={styles.input}
          />
        </div>

        <button onClick={login} style={styles.button}>
          Authorize Access
        </button>

        <p style={styles.footerText}>
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    margin: 0,
    overflow: "hidden"
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    padding: "48px",
    backgroundColor: "#0b0f1a", // Deep Navy/Black
    borderRadius: "24px",
    border: "1px solid #1e293b",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    textAlign: "center"
  },
  header: {
    marginBottom: "40px"
  },
  icon: {
    fontSize: "40px",
    marginBottom: "16px"
  },
  title: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "800",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0
  },
  formGroup: {
    textAlign: "left",
    marginBottom: "24px"
  },
  label: {
    display: "block",
    color: "#475569",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "all 0.2s ease"
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "12px"
  },
  footerText: {
    marginTop: "32px",
    color: "#334155",
    fontSize: "11px",
    fontWeight: "500"
  }
};