import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "src/api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const Eview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/data/get-assessment/${id}`);
        setAssessment(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching assessment:", err);
        setError("Failed to load assessment data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssessment();
    }
  }, [id]);

  // Styles object
  const styles = {
    pageWrapper: { width: "100vw", minHeight: "100vh", backgroundColor: "#0A1230", display: "flex", flexDirection: "column", fontFamily: "'Acme', sans-serif" },
    layoutBody: { display: "flex", flex: 1, marginTop: "70px" },
    mainContent: { flex: 1, backgroundColor: "#17276B", padding: "40px", marginLeft: "250px", color: "white" },
    breadcrumb: { fontSize: "18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
    statusBadge: (status) => ({ 
      backgroundColor: "transparent", 
      color: status === "Published" ? "#00FF00" : "#FFA500", 
      display: "flex", alignItems: "center", gap: "8px", fontSize: "18px" 
    }),
    contentGrid: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "40px" },
    infoSection: { display: "flex", flexDirection: "column", gap: "15px" },
    infoLabel: { color: "#B0B8D1", fontSize: "16px", fontWeight: "bold", marginRight: "10px" },
    previewCard: { backgroundColor: "#D9D9D9", borderRadius: "15px", padding: "20px", color: "black", marginBottom: "20px" },
    btnContainer: { display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" },
    backBtn: { padding: "8px 25px", borderRadius: "20px", border: "1px solid #666", backgroundColor: "#333", color: "white", cursor: "pointer" },
    editBtn: { padding: "8px 25px", borderRadius: "20px", border: "none", backgroundColor: "#444", color: "white", cursor: "pointer" }
  };

  // 1. Handle Loading state
  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px', fontSize: '24px'}}>Loading Assessment Details...</div>;
  
  // 2. Handle Error state
  if (error) return <div style={{color: 'red', textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>{error}</div>;
  
  // 3. Handle Empty data state
  if (!assessment) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>No assessment found.</div>;

  // 4. Calculate Total Marks safely AFTER we know assessment is not null
  const calculatedTotalMarks = assessment.questions?.reduce((sum, q) => {
    return sum + (Number(q.marks) || 0);
  }, 0) || 0;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          <div style={styles.breadcrumb}>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/manage")}>⚙ Manage Assessment</span>
            <span> {">"} </span>
            <span style={{ fontWeight: "bold" }}>View Assessment</span>
          </div>

          <div style={styles.headerRow}>
            <h2 style={{ fontSize: "28px", margin: 0 }}>{assessment.title || "Untitled"}</h2>
            <div style={styles.statusBadge(assessment.status || "Published")}>
              <div style={{ 
                width: "12px", height: "12px", borderRadius: "50%", 
                backgroundColor: (assessment.status === "Published" || !assessment.status) ? "#00FF00" : "#FFA500" 
              }}></div>
              {assessment.status || "Published"}
            </div>
          </div>

          <div style={styles.contentGrid}>
            <div style={styles.infoSection}>
              <h3 style={{ color: "#A0AEC0", textDecoration: "underline" }}>Overview</h3>
              <p><span style={styles.infoLabel}>Name:</span> {assessment.title}</p>
              <p><span style={styles.infoLabel}>Description:</span> {assessment.description}</p>
              <p><span style={styles.infoLabel}>Duration:</span> {assessment.duration} min</p>
              
              <p>
                <span style={styles.infoLabel}>Total Marks:</span> 
                {/* Fallback chain: use DB field first, if missing use calculated sum, if zero show 0 */}
                {assessment.totalMarks || calculatedTotalMarks || 0} Marks
              </p>

              <p><span style={styles.infoLabel}>Questions:</span> {assessment.questions?.length || 0}</p>
              <p><span style={styles.infoLabel}>Created On:</span> {new Date(assessment.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <h3 style={{ color: "#A0AEC0", marginBottom: '15px' }}>Questions Preview</h3>
              {assessment.questions && assessment.questions.length > 0 ? (
                assessment.questions.map((q, index) => (
                  <div key={index} style={styles.previewCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <strong>Type: {q.type}</strong>
                      <span>Marks: {q.marks}</span>
                    </div>
                    <p>{index + 1}. {q.question}</p>
                    
                    {q.type === "MCQ" && q.options && (
                      <div style={{ paddingLeft: "15px" }}>
                        {q.options.map((opt, i) => (
                          <p key={i}>
                            {i === Number(q.correctAnswer) ? "◉ " : "○ "} {opt}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No questions added to this assessment yet.</p>
              )}

              <div style={styles.btnContainer}>
                <button style={styles.backBtn} onClick={() => navigate("/manage")}>Back</button>
                <button style={styles.editBtn} onClick={() => navigate(`/edit-assessment/${id}`)}>Edit</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Eview;