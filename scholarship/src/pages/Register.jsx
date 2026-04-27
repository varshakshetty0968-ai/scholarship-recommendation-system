import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    education: "Undergraduate",
    gender: "Male",
    community: "General",
    religion: "Hindu",
    exservicemen: "No",
    disability: "No",
    sports: "No",
    annualPercentage: 0,
    income: 0,
    india: "In" // Defaulting to "In" as per your schema
  });

  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    const finalValue = (name === "annualPercentage" || name === "income") ? Number(value) : value;
    setForm({ ...form, [name]: finalValue });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (res.status === 201) {
        alert("✅ Registered Successfully!");
        localStorage.setItem("userId", data.id); 
        navigate("/student-login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (err) {
      alert("❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .register-wrapper {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          background-color: #041d3d;
          background-image: 
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(250, 204, 21, 0.08) 0px, transparent 50%);
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .register-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 40px;
          width: 100%;
          max-width: 600px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        }

        .register-card h2 {
          color: #facc15;
          font-size: 2.2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 8px;
        }

        .register-card p.subtitle {
          color: #94a3b8;
          text-align: center;
          margin-bottom: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .full-width { grid-column: span 2; }

        .input-group label {
          display: block;
          color: #cbd5e1;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 6px;
          margin-left: 4px;
        }

        .reg-input, .reg-select {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .reg-select option { background: #041d3d; color: white; }

        .reg-input:focus, .reg-select:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.2);
        }

        .reg-btn {
          width: 100%;
          padding: 16px;
          background: #facc15;
          color: #041d3d;
          border: none;
          border-radius: 14px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 25px;
          transition: 0.2s;
        }

        .reg-btn:hover:not(:disabled) {
          background: #fbbf24;
          transform: translateY(-2px);
        }

        .login-link {
          text-align: center;
          margin-top: 25px;
          color: #94a3b8;
        }

        .login-link a { color: #facc15; font-weight: 700; text-decoration: none; }
      `}</style>

      <div className="register-card">
        <h2>Create Profile</h2>
        <p className="subtitle">Set up your student account for scholarships</p>
        
        <form onSubmit={handleRegister}>
          <div className="form-grid">
            <div className="input-group full-width">
              <label>Full Name</label>
              <input name="name" className="reg-input" placeholder="John Doe" required onChange={change} />
            </div>

            <div className="input-group full-width">
              <label>Email Address</label>
              <input name="email" type="email" className="reg-input" placeholder="john@example.com" required onChange={change} />
            </div>

            <div className="input-group full-width">
              <label>Password</label>
              <input name="password" type="password" className="reg-input" placeholder="••••••••" required onChange={change} />
            </div>

            <div className="input-group">
              <label>Education</label>
              <select name="education" className="reg-select" value={form.education} onChange={change}>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Doctorate">Doctorate</option>
              </select>
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select name="gender" className="reg-select" value={form.gender} onChange={change}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Community</label>
              <select name="community" className="reg-select" value={form.community} onChange={change}>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC/ST</option>
              </select>
            </div>

            <div className="input-group">
              <label>Religion</label>
              <select name="religion" className="reg-select" value={form.religion} onChange={change}>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
              </select>
            </div>

            <div className="input-group">
              <label>Ex-Servicemen</label>
              <select name="exservicemen" className="reg-select" value={form.exservicemen} onChange={change}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="input-group">
              <label>Disability (PWD)</label>
              <select name="disability" className="reg-select" value={form.disability} onChange={change}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="input-group">
              <label>Sports Person</label>
              <select name="sports" className="reg-select" value={form.sports} onChange={change}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Added India Attribute */}
            <div className="input-group">
              <label>Residing in India?</label>
              <select name="india" className="reg-select" value={form.india} onChange={change}>
                <option value="In">In India</option>
                <option value="Out">Outside India</option>
              </select>
            </div>

            <div className="input-group">
              <label>Annual Percentage (%)</label>
              <input name="annualPercentage" type="number" className="reg-input" placeholder="0" step="0.01" onChange={change} />
            </div>

            <div className="input-group full-width">
              <label>Annual Family Income (₹)</label>
              <input name="income" type="number" className="reg-input" placeholder="0" onChange={change} />
            </div>
          </div>

          <button type="submit" className="reg-btn" disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/student-login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;