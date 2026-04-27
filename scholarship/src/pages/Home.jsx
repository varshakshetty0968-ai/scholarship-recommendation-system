import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student Portal",
      description: "Apply for scholarships, check application status, and view matches.",
      icon: "🎓",
      loginPath: "/student-login",
      registerPath: "/register",
    },
    {
      title: "Verifier Portal",
      description: "Review submitted applications, verify documents, and update status.",
      icon: "⚖️",
      loginPath: "/employee-login",
      registerPath: "/employee-register",
    },
    {
      title: "Admin Panel",
      description: "Manage system settings, user roles, and scholarship configurations.",
      icon: "⚙️",
      loginPath: "/admin-login",
      registerPath: "/admin-register", // Updated: Now includes registration
    }
  ];

  return (
    <div className="home-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .home-container {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), 
                      url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
        }

        .hero {
          height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 20px;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .hero h1 span {
          color: #60a5fa;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 700px;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .roles-section {
          padding: 20px 5% 100px;
          display: flex;
          justify-content: center;
        }

        .roles-grid {
          display: flex;
          gap: 30px;
          width: 100%;
          max-width: 1200px;
          justify-content: center;
        }

        .role-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.4s ease;
          flex: 1;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          display: flex;
          flex-direction: column;
        }

        .role-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.15);
          border-color: #60a5fa;
        }

        .icon-box {
          font-size: 50px;
          margin-bottom: 20px;
          background: rgba(96, 165, 250, 0.2);
          width: 80px;
          height: 80px;
          line-height: 80px;
          border-radius: 50%;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .role-card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .role-card p {
          font-size: 0.95rem;
          color: #cbd5e1;
          margin-bottom: 30px;
          line-height: 1.5;
          min-height: 50px;
        }

        .btn-portal {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
          margin-bottom: 12px;
        }

        .btn-login {
          background: #2563eb;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }

        .btn-login:hover {
          background: #1d4ed8;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
        }

        .btn-register {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .btn-register:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #60a5fa;
        }

        @media (max-width: 1024px) {
          .roles-grid {
            flex-direction: column;
            align-items: center;
          }
          .role-card {
            max-width: 450px;
            width: 100%;
          }
        }
      `}</style>

      <section className="hero">
        <h1>Empowering <span>Dreams</span></h1>
        <p>A unified digital gateway designed to simplify the scholarship lifecycle for students, verifiers, and administrators.</p>
      </section>

      <section className="roles-section">
        <div className="roles-grid">
          {roles.map((role, index) => (
            <div key={index} className="role-card">
              <div className="icon-box">{role.icon}</div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              
              <button 
                className="btn-portal btn-login"
                onClick={() => navigate(role.loginPath)}
              >
                Sign In
              </button>
              
              <button 
                className="btn-portal btn-register"
                onClick={() => navigate(role.registerPath)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;