import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        alert("Admin Account Created ✅");
        nav("/admin-login");
      } else {
        alert(data.message || "Registration failed ❌");
      }
    } catch (err) {
      alert("Connection error ❌");
    }
  };

  return (
    <div style={styles.container}>
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
        .login-link:hover {
          color: #ffffff !important;
          text-decoration: underline;
        }
      `}</style>

      <div style={styles.registerCard}>
        <div style={styles.header}>
          <div style={styles.icon}>👤⁺</div>
          <h2 style={styles.title}>Create Admin</h2>
          <p style={styles.subtitle}>Register new administrative credentials</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>ADMIN EMAIL</label>
          <input 
            placeholder="e.g. supervisor@portal.com"
            onChange={e => setEmail(e.target.value)} 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>SECURE PASSWORD</label>
          <input 
            type="password" 
            placeholder="Min. 8 characters"
            onChange={e => setPassword(e.target.value)} 
            style={styles.input}
          />
        </div>

        <button onClick={register} style={styles.button}>
          Create Account
        </button>

        <div style={styles.footer}>
          <p style={styles.footerText}>Already have an account?</p>
          <Link to="/admin-login" className="login-link" style={styles.link}>
            Sign In Here
          </Link>
        </div>
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
  registerCard: {
    width: "100%",
    maxWidth: "400px",
    padding: "48px",
    backgroundColor: "#0b0f1a",
    borderRadius: "28px",
    border: "1px solid #1e293b",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
    textAlign: "center"
  },
  header: {
    marginBottom: "35px"
  },
  icon: {
    fontSize: "36px",
    marginBottom: "12px",
    color: "#6366f1"
  },
  title: {
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "800",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    color: "#475569",
    fontSize: "14px",
    margin: 0
  },
  formGroup: {
    textAlign: "left",
    marginBottom: "20px"
  },
  label: {
    display: "block",
    color: "#64748b",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.2px",
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
    padding: "15px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px"
  },
  footer: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #1e293b"
  },
  footerText: {
    color: "#475569",
    fontSize: "13px",
    margin: "0 0 5px 0"
  },
  link: {
    color: "#6366f1",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease"
  }
};