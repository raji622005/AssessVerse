import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "src/api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const EvaluationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // 1. Fetch the specific submission
        const subRes = await axios.get(`/api/submissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const submission = subRes.data;

        if (submission) {
          // 2. Fetch the assessment details to get question texts
          const assessRes = await axios.get(`/api/assessments/${submission.assessmentId._id ||submission.assessmentId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setData({
            submission: submission,
            assessment: assessRes.data
          });
        }
      } catch (error) {
        console.error("Fetch Error:", error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvaluationData();
  }, [id]);

  const styles = {
    pageWrapper: { display: "flex", width: "100vw", flexDirection: "column", height: "100vh", backgroundColor: "#0A1230", color: "white", overflow: "hidden" },
    layoutBody: { display: "flex", flex: 1, overflow: "hidden" },
    mainContent: { flex: 1, padding: "140px", overflowY: "auto", backgroundColor: "#17276B", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
    headerText: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px", textTransform: "uppercase", borderBottom: "2px solid #48BB78", paddingBottom: "5px" },
    questionCard: { backgroundColor: "#D9D9D9", color: "black", padding: "30px", borderRadius: "15px", width: "80%", maxWidth: "800px", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" },
    fieldRow: { display: "flex", alignItems: "flex-start", marginBottom: "15px", fontSize: "18px" },
    label: { fontWeight: "bold", width: "160px", flexShrink: 0, color: "#17276B" },
    content: { flex: 1, paddingLeft: "10px", minHeight: "25px", color: "#333", borderLeft: "3px solid #17276B" },
    scoreHighlight: { fontWeight: "bold", color: "#2F855A", fontSize: "20px" },
    buttonRow: { display: "flex", gap: "20px", marginTop: "20px", marginBottom: "50px" },
    backBtn: { padding: "10px 30px", borderRadius: "20px", border: "none", cursor: "pointer", color: "white", fontWeight: "bold", backgroundColor: "#4A5568" }
  };

  if (loading) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Loading Evaluation...</div></div></div>;
  
  if (!data || !data.submission) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Evaluation Data Not Found.</div></div></div>;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          
          <div style={styles.headerText}>Submission Details</div>
          
          {/* Summary Info */}
          <div style={{ ...styles.questionCard, backgroundColor: "#E2E8F0", marginBottom: "20px" }}>
             <div style={styles.fieldRow}>
                <span style={styles.label}>Total Score:</span>
                <span style={styles.scoreHighlight}>{data.submission.score} / {data.assessment.totalMarks || 100}</span>
             </div>
             <div style={styles.fieldRow}>
                <span style={styles.label}>Status:</span>
                <span style={{ color: data.submission.status === 'evaluated' ? '#48BB78' : '#ECC94B', fontWeight: 'bold' }}>
                    {data.submission.status?.toUpperCase()}
                </span>
             </div>
          </div>

          {/* Loop through Questions */}
          {data.assessment?.questions?.map((q, index) => (
            <div key={q._id || index} style={styles.questionCard}>
              <div style={styles.fieldRow}>
                <span style={styles.label}>Question {index + 1}:</span>
                <div style={styles.content}>
                  {q.questionText || q.question || "No question text available"}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <span style={styles.label}>User Answer:</span>
                <div style={styles.content}>
                  {data.submission.answers?.[q._id] || data.submission.answers?.[index] || "No answer provided."}
                </div>
              </div>

             
            </div>
          ))}

          <div style={styles.buttonRow}>
            <button style={styles.backBtn} onClick={() => navigate(-1)}>Go Back</button>
          </div>
          
          <div style={{ fontSize: "12px", opacity: 0.7, paddingBottom: "20px" }}>
            © copyrights 2026 AssessVerse
          </div>
        </main>
      </div>
    </div>
  );
};

export default EvaluationDetail;