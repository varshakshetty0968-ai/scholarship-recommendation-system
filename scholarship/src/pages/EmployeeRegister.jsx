import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function EmployeeRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/add-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful ✅");
        navigate("/employee-login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="reg-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .reg-screen {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          overflow: hidden;
        }

        /* Brand Panel - Left 50% */
        .brand-panel {
          flex: 1;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .brand-panel h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -2px;
        }

        .brand-panel p {
          font-size: 1.2rem;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 450px;
        }

        /* Form Panel - Right 50% */
        .form-panel {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f172a;
          padding: 40px;
        }

        .form-box {
          width: 100%;
          max-width: 450px;
        }

        .form-box h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: #fff;
        }

        .form-box p.subtitle {
          color: #64748b;
          margin-bottom: 32px;
        }

        .input-wrapper {
          margin-bottom: 24px;
        }

        .input-wrapper label {
          display: block;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .styled-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #334155;
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .styled-input:focus {
          border-color: #6366f1;
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .register-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .register-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 32px;
          color: #64748b;
          font-size: 15px;
        }

        .login-footer a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        @media (max-width: 1024px) {
          .brand-panel { display: none; }
          .form-panel { flex: 1; }
        }
      `}</style>

      <div className="brand-panel">
        <h1>Join the <br />Verifier <br />Team.</h1>
        <p>
          Help us streamline the scholarship process by joining our administrative 
          verification network. Manage, review, and approve applications securely.
        </p>
      </div>

      <div className="form-panel">
        <div className="form-box">
          <h2>Create Account</h2>
          <p className="subtitle">Register your administrative credentials</p>

          <form onSubmit={handleRegister}>
            <div className="input-wrapper">
              <label>Full Name</label>
              <input
                className="styled-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label>Work Email</label>
              <input
                className="styled-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label>Security Password</label>
              <input
                className="styled-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Profile..." : "Register Now"}
            </button>
          </form>

          <p className="login-footer">
            Already have an account? 
            <Link to="/employee-login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegister;