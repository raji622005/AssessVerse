import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const EvaluationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState({}); 
  const [totalScore, setTotalScore] = useState(0);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch student submission
        const subRes = await axios.get(`/api/submissions/${id}`, config);
        const submission = subRes.data;

        if (submission) {
          const assessmentId = submission.assessmentId?._id || submission.assessmentId;
          
          // Fetch assessment template for questions
          const assessRes = await axios.get(`/api/assessments/${assessmentId}`, config);
          
          setData({
            submission: submission,
            assessment: assessRes.data
          });
        }
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvaluationData();
  }, [id]);

  // --- 2. AUTOMATIC SCORE CALCULATION ---
  useEffect(() => {
    const sum = Object.values(marks).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    setTotalScore(sum);
  }, [marks]);

  const handleMarkChange = (qId, value) => {
    setMarks(prev => ({ ...prev, [qId]: value }));
  };

  // --- 3. SAVE TO DATABASE ---
  const handleSaveMarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const payload = { 
        score: totalScore, 
        status: "evaluated" 
      };

      const response = await axios.patch(`/api/submissions/${id}`, payload, config);

      if (response.status === 200 || response.status === 204) {
        alert(`✅ Marks saved successfully! Total Score: ${totalScore}`);
        navigate("/evaluate"); 
      }
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      alert("❌ Failed to save marks.");
    }
  };

  const styles = {
    pageWrapper: { display: "flex", width: "100vw", flexDirection: "column", height: "100vh", backgroundColor: "#0A1230", color: "white", overflow: "hidden" },
    layoutBody: { display: "flex", flex: 1, overflow: "hidden" },
    mainContent: { flex: 1, padding: "40px", overflowY: "auto", backgroundColor: "#17276B", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
    headerText: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px", textTransform: "uppercase" },
    questionCard: { backgroundColor: "#D9D9D9", color: "black", padding: "40px", borderRadius: "15px", width: "80%", maxWidth: "800px" },
    fieldRow: { display: "flex", alignItems: "flex-start", marginBottom: "20px", fontSize: "18px" },
    label: { fontWeight: "bold", width: "150px", flexShrink: 0 },
    line: { borderBottom: "1px solid black", flex: 1, paddingLeft: "10px", minHeight: "25px", color: "#333", wordBreak: "break-word" },
    buttonRow: { display: "flex", gap: "20px", marginTop: "20px", alignSelf: "flex-end", marginRight: "10%", marginBottom: "50px" },
    btn: { padding: "10px 25px", borderRadius: "20px", border: "none", cursor: "pointer", color: "white", fontWeight: "bold" },
    saveBtn: { backgroundColor: "#48BB78" },
    scoreSummary: { fontSize: "22px", fontWeight: "bold", color: "#48BB78", textAlign: "right", width: "80%", maxWidth: "800px" }
  };

  if (loading) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Loading Data...</div></div></div>;
  if (!data) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Submission Not Found.</div></div></div>;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          
          <div style={styles.headerText}>
            Evaluating: {data.submission.userId?.name || "Unknown Student"}
          </div>

          {data.assessment?.questions?.map((q, index) => {
            // --- UPDATED SEPARATION LOGIC ---
            const allAnswers = data.submission.answers || {};
            
            // Access answer via ID or index key (0, 1, 2...)
            const specificAnswer = allAnswers[q._id] ?? allAnswers[index.toString()] ?? allAnswers[index];

            const displayAnswer = typeof specificAnswer === 'object' 
              ? JSON.stringify(specificAnswer) 
              : (specificAnswer || "No answer provided.");
            // --------------------------------

            return (
              <div key={q._id || index} style={styles.questionCard}>
                <div style={styles.fieldRow}>
                  <span style={styles.label}>{index + 1}:</span>
                  <div style={styles.line}>
                    {q.questionText || q.question || "Question text missing"}
                  </div>
                </div>

                <div style={styles.fieldRow}>
                  <span style={styles.label}>Answer:</span>
                  <div style={{ ...styles.line, backgroundColor: "rgba(0,0,0,0.05)", padding: "10px", borderRadius: "5px", borderBottom: "none" }}>
                    {displayAnswer}
                  </div>
                </div>

                <div style={styles.fieldRow}>
                  <input 
                    type="number" 
                    style={{ width: '80px', border: 'none', background: 'transparent', borderBottom: '2px solid black', fontSize: '18px', textAlign: 'center', outline: "none" }}
                    placeholder="0"
                    value={marks[q._id || index] || ""}
                    onChange={(e) => handleMarkChange(q._id || index, e.target.value)}
                  />
                  <span style={{ marginLeft: '10px' }}>/ {q.marks || q.points || 5}</span>
                </div>
              </div>
            );
          })}

          <div style={styles.scoreSummary}>
            Total Score: {totalScore}
          </div>

          <div style={styles.buttonRow}>
            <button style={{ ...styles.btn, backgroundColor: "#E53E3E" }} onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button style={{ ...styles.btn, ...styles.saveBtn }} onClick={handleSaveMarks}>
              Save Marks
            </button>
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