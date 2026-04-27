import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scholarshipName } = location.state || {};
  const studentId = localStorage.getItem('userId');

  const [studentProfile, setStudentProfile] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '' });
  
  // Expanded documents state
  const [documents, setDocuments] = useState({ 
    aadharCard: null, 
    incomeTax: null, 
    academicMarksheet: null,
    sportsCertificate: null,
    casteCertificate: null,
    religionCertificate: null,
    additionalCertificate: null 
  });
  
  const [isViewing, setIsViewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/applications/detail/${studentId}`);
        setStudentProfile(res.data.student);
        if (res.data.student?.name) {
          setFormData(prev => ({ ...prev, fullName: res.data.student.name }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (studentId) fetchProfile();
  }, [studentId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setDocuments(prev => ({ ...prev, [e.target.name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submitApplication = async () => {
    // Basic validation for mandatory fields
    if (!formData.fullName || !formData.phone || !formData.address || !documents.aadharCard || !documents.incomeTax || !documents.academicMarksheet) {
      alert("⚠️ Mandatory documents (Aadhar, Income, Marksheet) are missing!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/apply', {
        student_id: studentId,
        scholarship_name: scholarshipName,
        student_details: {
          ...formData,
          category: studentProfile?.community,
          religion: studentProfile?.religion,
          education_level: studentProfile?.education,
          current_percentage: studentProfile?.annualPercentage
        },
        documents: documents 
      });

      if (response.status === 201) {
        navigate('/applications');
      }
    } catch (err) { 
      alert("❌ Submission Error"); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!scholarshipName) return <div style={{backgroundColor: '#000', height: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><h2>No Scholarship Selected</h2></div>;

  return (
    <div className="form-page-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .form-page-wrapper {
          min-height: 100vh;
          width: 100vw;
          background-color: #000000;
          background-image: 
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,10%,1) 0, transparent 50%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          justify-content: center;
          padding: 60px 20px;
          box-sizing: border-box;
        }

        .form-container {
          width: 100%;
          max-width: 900px; /* Widened to fit more tiles */
          background: #0b0f1a;
          padding: 50px;
          border-radius: 28px;
          border: 1px solid #1e293b;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
          color: white;
        }

        .form-header h2 { font-size: 2.2rem; color: #ffffff; margin: 0; font-weight: 800; letter-spacing: -1px; }
        .scholarship-badge { 
          display: inline-flex; align-items: center; margin-top: 15px; padding: 8px 16px; 
          background: #1e1b4b; border: 1px solid #3730a3; color: #c7d2fe; border-radius: 12px; font-size: 0.9rem; 
        }

        .section-title {
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
          color: #475569; margin: 40px 0 20px; display: flex; align-items: center; gap: 15px;
        }
        .section-title::after { content: ''; flex: 1; height: 1px; background: #1e293b; }

        .input-box {
          width: 100%; padding: 16px; background: #020617; border: 1px solid #1e293b;
          border-radius: 12px; color: white; font-size: 1rem; transition: 0.3s; box-sizing: border-box;
        }
        .input-box:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }

        .doc-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;
        }

        .file-tile {
          position: relative; background: #0f172a; border: 1px solid #1e293b;
          border-radius: 16px; padding: 20px; transition: 0.2s;
        }
        .file-tile:hover { border-color: #334155; transform: translateY(-3px); background: #131c2e; }
        .file-tile.uploaded { border-color: #059669; background: #062016; }

        .file-label { display: block; font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; }
        .file-status { font-size: 0.85rem; font-weight: 700; color: #fbbf24; }
        .file-status.success { color: #10b981; }

        .file-input-hidden { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

        .btn-primary { 
          background: #ffffff; color: #000; padding: 16px 36px; border-radius: 14px; 
          font-weight: 700; border: none; cursor: pointer; font-size: 1rem;
        }
        .btn-ghost { background: transparent; color: #64748b; border: none; cursor: pointer; font-weight: 600; }

        .review-card { background: #020617; border-radius: 20px; padding: 30px; border: 1px solid #1e293b; }
        .review-item label { font-size: 0.7rem; color: #475569; text-transform: uppercase; font-weight: 700; }
        .review-item p { margin: 4px 0 15px; font-size: 1.1rem; color: #fff; }
      `}</style>

      <div className="form-container">
        <header className="form-header">
          <h2>Apply for Funds</h2>
          <div className="scholarship-badge">
            <span style={{marginRight: '8px'}}>🎓</span> {scholarshipName}
          </div>
        </header>

        {!isViewing ? (
          <>
            <div className="section-title">Personal Information</div>
            <div className="grid-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <input name="fullName" className="input-box" placeholder="Full Name" onChange={handleChange} value={formData.fullName} />
              <input name="phone" className="input-box" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
            </div>
            <textarea name="address" className="input-box" style={{height: '80px', marginTop: '20px', resize: 'none'}} placeholder="Residential Address" onChange={handleChange} value={formData.address} />

            <div className="section-title">Certification & Proofs</div>
            <div className="doc-grid">
              {[
                { label: "Aadhar Identity", name: "aadharCard" },
                { label: "Income Proof", name: "incomeTax" },
                { label: "Academic Marksheet", name: "academicMarksheet" },
                { label: "Sports Certificate", name: "sportsCertificate" },
                { label: "Caste Certificate", name: "casteCertificate" },
                { label: "Religion Certificate", name: "religionCertificate" },
                { label: "Other Achievement", name: "additionalCertificate" }
              ].map(doc => (
                <div className={`file-tile ${documents[doc.name] ? 'uploaded' : ''}`} key={doc.name}>
                  <label className="file-label">{doc.label}</label>
                  <div className={`file-status ${documents[doc.name] ? 'success' : ''}`}>
                    {documents[doc.name] ? "✓ Attached" : "Upload File"}
                  </div>
                  <input type="file" name={doc.name} className="file-input-hidden" onChange={handleFileChange} />
                </div>
              ))}
            </div>

            <div className="btn-group" style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={() => navigate(-1)} className="btn-ghost">Discard</button>
              <button onClick={() => setIsViewing(true)} className="btn-primary">Review Application</button>
            </div>
          </>
        ) : (
          <div className="review-area">
              <div className="section-title">Final Verification</div>
              <div className="review-card">
                 <div className="review-item">
                    <label>Candidate</label>
                    <p>{formData.fullName}</p>
                 </div>
                 <div className="review-item">
                    <label>Documents Uploaded</label>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
                        {Object.entries(documents).map(([key, value]) => value && (
                            <span key={key} style={{fontSize: '0.8rem', background: '#1e293b', padding: '4px 10px', borderRadius: '6px', color: '#10b981'}}>
                                ✓ {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        ))}
                    </div>
                 </div>
              </div>

              <div className="btn-group" style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={() => setIsViewing(false)} className="btn-ghost">Back to Edit</button>
                <button onClick={submitApplication} disabled={isSubmitting} className="btn-primary" style={{background: '#10b981', color: '#fff'}}>
                  {isSubmitting ? "Processing..." : "Submit Securely"}
                </button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;