import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VerificationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/applications/detail/${id}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await fetch(`http://localhost:5000/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, remarks }),
      });
      alert(`Application ${status} Successfully`);
      navigate("/employee-dashboard");
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  if (!data) {
    return <div className="loading-state">Identifying Application Details...</div>;
  }

  const { application, student } = data;

  const renderDoc = (label, src) => {
    if (!src) return null;
    return (
      <div className="doc-tile">
        <div className="doc-header">
          <span className="doc-icon">📜</span>
          <p className="doc-label">{label}</p>
        </div>
        <div className="image-wrapper">
          <img src={src} alt={label} className="doc-image" />
          <div className="image-hover-overlay">
            <a href={src} target="_blank" rel="noreferrer" className="view-btn">
              Open Full View
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="verification-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .verification-wrapper { padding: 40px; font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000; min-height: 100vh; color: #fff; }
        .loading-state { display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 1.2rem; color: #fff; }
        .main-title { font-size: 2.2rem; font-weight: 800; color: #fff; margin: 0; }
        .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #222; padding-bottom: 20px; }
        
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 40px; }
        .info-card { background: #0b0f1a; padding: 24px; border-radius: 20px; border: 1px solid #1e293b; }
        .info-card h3 { color: #fbbf24; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; border-bottom: 1px solid #1e293b; padding-bottom: 10px; }

        .data-row { display: flex; margin-bottom: 12px; font-size: 0.95rem; }
        .data-label { width: 140px; font-weight: 600; color: #64748b; }
        .data-value { color: #f8fafc; flex: 1; }

        .section-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 25px; color: #fff; display: flex; align-items: center; gap: 10px; }
        
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 50px; }
        .doc-tile { background: #0b0f1a; border-radius: 18px; overflow: hidden; border: 1px solid #1e293b; transition: 0.3s; }
        .doc-tile:hover { transform: translateY(-5px); border-color: #334155; }
        .doc-header { padding: 15px 20px; background: rgba(255,255,255,0.03); display: flex; align-items: center; gap: 10px; }
        .doc-label { margin: 0; font-weight: 700; font-size: 0.85rem; color: #cbd5e1; }
        .image-wrapper { position: relative; height: 200px; overflow: hidden; background: #020617; }
        .doc-image { width: 100%; height: 100%; object-fit: contain; }
        .image-hover-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; opacity: 0; transition: 0.3s; }
        .image-wrapper:hover .image-hover-overlay { opacity: 1; }
        .view-btn { background: #fff; color: #000; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.8rem; }

        .review-section { background: #0b0f1a; padding: 35px; border-radius: 24px; border: 1px solid #1e293b; }
        .remarks-area { width: 100%; min-height: 100px; padding: 20px; background: #020617; border-radius: 12px; border: 1px solid #1e293b; color: #fff; font-family: inherit; margin-bottom: 25px; box-sizing: border-box; outline: none; }
        .remarks-area:focus { border-color: #6366f1; }
        
        .button-row { display: flex; gap: 20px; }
        .action-button { flex: 1; padding: 16px; border-radius: 12px; font-weight: 800; cursor: pointer; border: none; transition: 0.2s; }
        .approve-button { background: #10b981; color: #fff; }
        .reject-button { background: #ef4444; color: #fff; }
        .approve-button:hover { background: #059669; transform: scale(1.02); }
        .reject-button:hover { background: #dc2626; transform: scale(1.02); }

        @media (max-width: 900px) { .info-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="header-section">
        <h1 className="main-title">Verification Console</h1>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: 600}}>← Back</button>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Scholarship & Program</h3>
          <div className="data-row">
            <span className="data-label">Scheme:</span>
            <span className="data-value" style={{color: '#fbbf24', fontWeight: 700}}>{application?.scholarship_name}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Applied Date:</span>
            <span className="data-value">{new Date(application?.appliedAt).toLocaleDateString()}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Ref ID:</span>
            <span className="data-value">{application?._id.toUpperCase()}</span>
          </div>
        </div>

        <div className="info-card">
          <h3>Student Profile</h3>
          <div className="data-row">
            <span className="data-label">Full Name:</span>
            <span className="data-value">{application?.student_details?.fullName}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Contact:</span>
            <span className="data-value">{application?.student_details?.phone}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Address:</span>
            <span className="data-value">{application?.student_details?.address}</span>
          </div>
        </div>
      </div>

      <h4 className="section-title"><span>📂</span> Evidence Verification</h4>
      <div className="doc-grid">
        {/* Verification for ALL potential documents in your ApplyForm */}
        {renderDoc("Aadhar Identity", application?.documents?.aadharCard)}
        {renderDoc("Income Proof", application?.documents?.incomeTax)}
        {renderDoc("Academic Marksheet", application?.documents?.academicMarksheet)}
        {renderDoc("Sports Achievement", application?.documents?.sportsCertificate)}
        {renderDoc("Caste Certificate", application?.documents?.casteCertificate)}
        {renderDoc("Religion Certificate", application?.documents?.religionCertificate)}
        {renderDoc("Other Attachments", application?.documents?.additionalCertificate)}
      </div>

      <div className="review-section">
        <h4 className="section-title"><span>✍️</span> Final Review Decision</h4>
        <textarea
          className="remarks-area"
          placeholder="Enter detailed remarks (required for rejection)..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className="button-row">
          <button onClick={() => updateStatus("Approved")} className="action-button approve-button">
            Approve & Validate
          </button>
          <button onClick={() => updateStatus("Rejected")} className="action-button reject-button">
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;