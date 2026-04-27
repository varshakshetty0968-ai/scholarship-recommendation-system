import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store correct keys
        localStorage.setItem("userId", data._id);
        localStorage.setItem("name", data.name);   // ✅ FIXED HERE
        
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server connection error. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .login-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
          background-color: #041d3d;
          background-image: 
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(250, 204, 21, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.1) 0px, transparent 50%);
          overflow: hidden;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 48px;
          width: 90%;
          max-width: 440px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          text-align: center;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-card h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #facc15;
          margin-bottom: 12px;
          letter-spacing: -0.04em;
        }

        .login-card p.subtitle {
          color: #94a3b8;
          margin-bottom: 36px;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 24px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 8px;
        }

        .login-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.07);
          font-size: 1rem;
          color: white;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .login-input:focus {
          outline: none;
          border-color: #facc15;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.15);
        }

        .login-button {
          width: 100%;
          padding: 16px;
          background: #facc15;
          color: #041d3d;
          border: none;
          border-radius: 14px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
          box-shadow: 0 10px 15px -3px rgba(250, 204, 21, 0.3);
        }

        .login-button:hover:not(:disabled) {
          background: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(250, 204, 21, 0.4);
        }

        .login-button:disabled {
          background: #4b5563;
          cursor: not-allowed;
        }

        .footer-text {
          margin-top: 28px;
          font-size: 0.95rem;
          color: #94a3b8;
        }

        .register-link {
          color: #facc15;
          text-decoration: none;
          font-weight: 700;
        }

        .back-home {
          display: inline-flex;
          align-items: center;
          margin-top: 24px;
          font-size: 0.9rem;
          color: #64748b;
          text-decoration: none;
        }
      `}</style>

      <div className="login-card">
        <h2>Student Login</h2>
        <p className="subtitle">Secure access to your scholarship dashboard.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@university.edu"
              required
              className="login-input"
              value={form.email}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="login-input"
              value={form.password}
              onChange={change}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Verifying..." : "Sign In to Portal"}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Role Selection
        </Link>
      </div>
    </div>
  );
}

export default Login;