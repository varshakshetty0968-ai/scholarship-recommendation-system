import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export default function Reports() {
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all data safely
    Promise.all([
      fetch("http://localhost:5000/students").then(res => res.json()).catch(() => []),
      fetch("http://localhost:5000/employees").then(res => res.json()).catch(() => []),
      fetch("http://localhost:5000/scholarships").then(res => res.json()).catch(() => [])
    ]).then(([studentsData, employeesData, scholarshipsData]) => {
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setEmployees(Array.isArray(employeesData) ? employeesData : []);
      setScholarships(Array.isArray(scholarshipsData) ? scholarshipsData : []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ color: "white", padding: "50px", textAlign: "center", fontSize: "1.5rem" }}>Loading your reports...</div>;
  }

  // --- LOGIC ---
  const activeCount = 
    students.filter(s => s?.accountStatus === "Active" || !s?.accountStatus).length +
    employees.filter(e => e?.accountStatus === "Active" || !e?.accountStatus).length;

  const inactiveCount = 
    students.filter(s => s?.accountStatus === "Inactive").length +
    employees.filter(e => e?.accountStatus === "Inactive").length;

  // --- DATA FOR GRAPHS ---
  const barData = [
    { name: 'Students', count: students.length },
    { name: 'Employees', count: employees.length },
    { name: 'Scholarships', count: scholarships.length }
  ];

  const pieData = [
    { name: 'Active', value: activeCount },
    { name: 'Deactivated', value: inactiveCount }
  ];
  const PIE_COLORS = ['#10b981', '#ef4444']; 

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.heading}>System Insights 📈</h1>
        <p style={styles.subtext}>Live administrative overview of Students, Staff, and Scholarships</p>
      </header>

      {/* GRAPHS SECTION */}
      <div style={styles.chartsGrid}>
        
        {/* GRAPH 1: BAR CHART */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Distribution Overview</h3>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0b0f1a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 2: PIE CHART */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Account Status Breakdown</h3>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0b0f1a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#94a3b8' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { minHeight: "100vh", width: "100vw", backgroundColor: "#000", color: "white", padding: "60px 40px", boxSizing: "border-box", overflowX: "hidden" },
  header: { marginBottom: "50px", borderLeft: "5px solid #6366f1", paddingLeft: "25px" },
  heading: { fontSize: "2.8rem", fontWeight: "800", margin: 0 },
  subtext: { color: "#64748b", marginTop: "8px", fontSize: "1.1rem" },
  
  chartsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" },
  chartCard: { background: "#0b0f1a", padding: "30px", borderRadius: "24px", border: "1px solid #1e293b", display: 'flex', flexDirection: 'column' },
  chartTitle: { margin: "0 0 20px 0", color: "#f8fafc", fontSize: "1.2rem", fontWeight: "600", letterSpacing: "1px" },
  chartWrapper: { height: "350px", minHeight: "350px", width: "100%" }
};