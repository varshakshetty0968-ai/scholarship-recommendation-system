import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/employee-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("employeeName", data.name);
        alert("Login Successful ✅");
        navigate("/employee-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again.");
    }
    setLoading(false);
  };

  const styles = {
    screenContainer: {
      display: "flex",
      minHeight: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "#0f172a",
    },
    // Left Side - 50% Width
    brandSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px",
      position: "relative",
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    decorativeCircle: {
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "400px",
      height: "400px",
      background: "rgba(99, 102, 241, 0.1)",
      filter: "blur(80px)",
      borderRadius: "50%",
    },
    brandTitle: {
      color: "#fff",
      fontSize: "56px",
      fontWeight: "900",
      margin: "0 0 20px 0",
      lineHeight: "1.1",
      letterSpacing: "-2px",
    },
    brandSubtitle: {
      color: "#94a3b8",
      fontSize: "20px",
      lineHeight: "1.6",
      maxWidth: "500px",
    },
    // Right Side - 50% Width
    formSection: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      padding: "40px",
    },
    formContainer: {
      width: "100%",
      maxWidth: "480px", // Form itself stays readable while background fills screen
    },
    label: {
      display: "block",
      color: "#94a3b8",
      fontSize: "13px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      background: "rgba(30, 41, 59, 0.5)",
      border: "1px solid #334155",
      borderRadius: "16px",
      padding: "18px 24px",
      color: "#fff",
      fontSize: "16px",
      marginBottom: "30px",
      outline: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxSizing: "border-box",
    },
    loginBtn: {
      width: "100%",
      padding: "18px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      color: "white",
      fontSize: "17px",
      fontWeight: "700",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(99, 102, 241, 0.2)",
    },
    footerLink: {
      textAlign: "center",
      marginTop: "30px",
      color: "#64748b",
      fontSize: "15px",
    },
    link: {
      color: "#818cf8",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "8px",
      borderBottom: "1px solid transparent",
      transition: "border 0.3s ease",
    }
  };

  return (
    <div style={styles.screenContainer}>
      {/* LEFT: IMMERSIVE BRANDING */}
      <div style={styles.brandSection}>
        <div style={styles.decorativeCircle} />
        <h1 style={styles.brandTitle}>Admin <br />Console.</h1>
        <p style={styles.brandSubtitle}>
          Secure internal portal for scholarship verification, application auditing, 
          and status management.
        </p>
      </div>

      {/* RIGHT: FULL-WIDTH LOGIN ACTION */}
      <div style={styles.formSection}>
        <div style={styles.formContainer}>
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ color: "#fff", fontSize: "32px", marginBottom: "10px" }}>Login</h2>
            <p style={{ color: "#64748b" }}>Enter your administrative credentials</p>
          </div>

          <form onSubmit={handleLogin}>
            <div>
              <label style={styles.label}>Corporate Email</label>
              <input
                style={styles.input}
                type="email"
                placeholder="name@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366f1";
                  e.target.style.background = "rgba(30, 41, 59, 0.8)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155";
                  e.target.style.background = "rgba(30, 41, 59, 0.5)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            <div>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366f1";
                  e.target.style.background = "rgba(30, 41, 59, 0.8)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155";
                  e.target.style.background = "rgba(30, 41, 59, 0.5)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                ...styles.loginBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => {
                if(!loading) e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                if(!loading) e.target.style.transform = "translateY(0)";
              }}
            >
              {loading ? "Authenticating Session..." : "Continue to Dashboard"}
            </button>
          </form>

          <div style={styles.footerLink}>
            Need an account? 
            <Link to="/employee-register" style={styles.link}>Request Access</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;