import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

/* ================= PAGE IMPORTS ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Applications from "./pages/Applications";
import Scholarships from "./pages/Scholarships";
import ApplyForm from "./pages/ApplyForm";
import Chat from "./Chat";

import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeRegister from "./pages/EmployeeRegister";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import VerificationPage from "./pages/VerificationPage";
import EmployeeManagement from "./pages/EmployeeManagement"; 
import EmployeeProfile from "./pages/EmployeeProfile";       

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import ScholarshipManagement from "./pages/ScholarshipManagement";
import UserManagement from "./pages/UserManagement";
import StudentProfile from "./pages/StudentProfile";
import Reports from "./pages/Reports";

/* ================= NAVIGATION COMPONENT ================= */
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Paths where the student navbar should NOT appear
  const hideNavbarPaths = [
    "/", 
    "/student-login", 
    "/register", 
    "/employee-login", 
    "/employee-register", 
    "/employee-dashboard", 
    "/admin-login", 
    "/admin-register",
    "/admin-dashboard",        // Hidden for Admin Dashboard
    "/employees-manage",       // Hidden for Employee Management
    "/scholarships-manage",    // Hidden for Scholarship Management
    "/users",                  // Hidden for User Management
    "/reports"                 // Hidden for Reports
  ];

  // Logic to hide navbar for exact matches OR dynamic ID routes
  if (
    hideNavbarPaths.includes(location.pathname) || 
    location.pathname.startsWith("/verify/") || 
    location.pathname.startsWith("/employee-profile/") ||
    location.pathname.startsWith("/user-profile/")
  ) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={navStyles.navbar}>
      <div style={navStyles.logo}>SCHOLARSHIP PORTAL</div>
      <Link style={navStyles.link} to="/dashboard">Dashboard</Link>
      <Link style={navStyles.link} to="/recommendations">Matches</Link>
      <Link style={navStyles.link} to="/applications">Applications</Link>
      <Link style={navStyles.link} to="/scholarships">Scholarships</Link>
      <Link style={{ ...navStyles.link, color: "#facc15" }} to="/chat">💬 Chat</Link>
      
      {/* Admin Link removed to keep student and admin views separate */}
      
      <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
    </nav>
  );
};

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <Router>
      <Navigation />
      {/* Container to ensure full-screen background consistency across all pages */}
      <div style={{ width: "100vw", minHeight: "100vh", background: "#0f172a", margin: 0, padding: 0, overflowX: "hidden" }}>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/apply-form" element={<ApplyForm />} />
          <Route path="/chat" element={<Chat />} />

          {/* Employee Routes */}
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employee-register" element={<EmployeeRegister />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/verify/:id" element={<VerificationPage />} />
          <Route path="/employees-manage" element={<EmployeeManagement />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfile />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/scholarships-manage" element={<ScholarshipManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/user-profile/:id" element={<StudentProfile />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

const navStyles = {
  navbar: { 
    background: "#0f172a", 
    padding: "15px 4%", 
    display: "flex", 
    gap: "20px", 
    alignItems: "center", 
    borderBottom: "1px solid rgba(255,255,255,0.1)" 
  },
  logo: { 
    fontWeight: "800", 
    color: "#facc15", 
    marginRight: "20px" 
  },
  link: { 
    color: "#cbd5e1", 
    textDecoration: "none", 
    fontWeight: "600" 
  },
  logoutBtn: { 
    marginLeft: "auto", 
    background: "transparent", 
    color: "#ff7675", 
    border: "1px solid #e74c3c", 
    padding: "5px 10px", 
    borderRadius: "5px", 
    cursor: "pointer" 
  }
};