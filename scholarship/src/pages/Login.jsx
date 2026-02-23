import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('studentId', res.data._id);
      localStorage.setItem('studentName', res.data.name);
      navigate('/dashboard');
    } catch (err) { alert("Invalid credentials"); }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{ display: 'block', margin: '10px 0' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{ display: 'block', margin: '10px 0' }} />
        <button type="submit">Login</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </div>
  );
};
export default Login;