import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  // Initialize state with default values matching your CSV categories
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    education: "Undergraduate",
    gender: "Male",
    community: "General",
    religion: "Hindu",
    exservice: "No",
    disability: "No",
    sports: "No",
    percentage: "90-100",
    income: "Upto 1.5L"
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents page reload
    
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/"); // This redirects you to the Login page
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is not responding.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Student Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" onChange={change} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" onChange={change} required style={inputStyle} />
        <input name="password" type="password" placeholder="Password" onChange={change} required style={inputStyle} />
        
        <label>Community:</label>
        <select name="community" onChange={change} style={inputStyle}>
          <option>General</option>
          <option>OBC</option>
          <option>SC/ST</option>
          <option>Minority</option>
        </select>

        <label>Income:</label>
        <select name="income" onChange={change} style={inputStyle}>
          <option>Upto 1.5L</option>
          <option>1.5L to 3L</option>
          <option>3L to 6L</option>
          <option>Above 6L</option>
        </select>

        <button type="submit" style={{ padding: "10px", width: "100%", background: "blue", color: "white" }}>
          Register Now
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

const inputStyle = { display: "block", width: "100%", padding: "8px", margin: "10px 0" };

export default Register;