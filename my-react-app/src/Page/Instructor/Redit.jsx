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
  const [marks, setMarks] = useState({}); // State to track marks input
const [totalScore, setTotalScore] = useState(0);
  useEffect(() => {
  const fetchEvaluationData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // 1. Get token

      // Configuration object for Axios headers
      const config = {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      };

      // 2. Fetch the specific submission using the token
      const subRes = await axios.get(
        `/api/submissions/${id}`, 
        config
      );
      const submission = subRes.data;

      if (!submission) {
        setData(null);
      } else {
        // 3. Extract the ID string correctly to avoid [object Object] 500 errors
        const assessmentId = submission.assessmentId?._id || submission.assessmentId;

        // 4. Fetch the original assessment questions using the token
        const assessRes = await axios.get(
          `/api/assessments/${assessmentId}`, 
          config
        );
        
        setData({
          submission: submission,
          assessment: assessRes.data
        });
      }
    } catch (error) {
      // Enhanced logging to see why it fails (401, 403, or 500)
      console.error("Detailed Fetch Error:", error.response ? error.response.data : error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchEvaluationData();
  }
}, [id]);
  // Redit.jsx
const handleSaveMarks = async () => {
  try {
    const token = localStorage.getItem("token"); // Get token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Include config as the THIRD argument for PATCH/POST
    const response = await axios.patch(
      `/api/submissions/${id}`, 
      { score: totalScore, status: "evaluated" }, // Data is 2nd arg
      config // Headers are 3rd arg
    );

    alert("Marks saved successfully!");
  } catch (err) {
    console.error("Error saving marks:", err.response?.data || err.message);
  }
};
  const handleMarkChange = (qId, value) => {
    setMarks({ ...marks, [qId]: value });
  };

  const styles = {
    pageWrapper: { display: "flex", width: "100vw", flexDirection: "column", height: "100vh", backgroundColor: "#0A1230", color: "white", overflow: "hidden" },
    layoutBody: { display: "flex", flex: 1, overflow: "hidden" },
    mainContent: { flex: 1, padding: "40px", overflowY: "auto", backgroundColor: "#17276B", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
    headerText: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px", textTransform: "uppercase" },
    questionCard: { backgroundColor: "#D9D9D9", color: "black", padding: "40px", borderRadius: "15px", width: "80%", maxWidth: "800px" },
    fieldRow: { display: "flex", alignItems: "flex-start", marginBottom: "20px", fontSize: "18px" },
    label: { fontWeight: "bold", width: "150px", flexShrink: 0 },
    line: { borderBottom: "1px solid black", flex: 1, paddingLeft: "10px", minHeight: "25px", color: "#333" },
    buttonRow: { display: "flex", gap: "20px", marginTop: "20px", alignSelf: "flex-end", marginRight: "10%", marginBottom: "50px" },
    btn: { padding: "10px 25px", borderRadius: "20px", border: "none", cursor: "pointer", color: "white", fontWeight: "bold" },
    saveBtn: { backgroundColor: "#48BB78" }
  };

  if (loading) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Loading Data...</div></div></div>;
  
  if (!data || !data.submission) return <div style={styles.pageWrapper}><Headeri /><div style={styles.layoutBody}><Sidebari /><div style={styles.mainContent}>Submission Data Not Found.</div></div></div>;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          
          {/* FIXED: Added fallbacks for Student Name */}
          

          {/* FIXED: Map questions with robust field checking */}
          {data.assessment?.questions?.map((q, index) => (
            <div key={q._id || index} style={styles.questionCard}>
              <div style={styles.fieldRow}>
                <span style={styles.label}>Question {index + 1}:</span>
                <div style={styles.line}>
                  {/* Robust check for question text field name */}
                  {q.questionText || q.question || "Question text is missing in database"}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <span style={styles.label}>User Answer :</span>
                <div style={styles.line}>
                  {/* Pulls answer from the Object map using Question ID */}
                  {data.submission.answers?.[q._id] || data.submission.answers?.[index] || "No answer provided."}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <span style={styles.label}>Marks :</span>
                <input 
                  type="number" 
                  style={{ width: '60px', border: 'none', background: 'transparent', borderBottom: '2px solid black', fontSize: '18px', textAlign: 'center' }}
                  placeholder="0"
                  onChange={(e) => handleMarkChange(q._id, e.target.value)}
                />
                <span style={{ marginLeft: '10px' }}>/ {q.points || 10}</span>
              </div>
            </div>
          ))}

          <div style={styles.buttonRow}>
            <button style={{ ...styles.btn, backgroundColor: "#E53E3E" }} onClick={() => navigate(-1)}>Cancel</button>
            <button style={{ ...styles.btn, ...styles.saveBtn }}onClick={handleSaveMarks}>Save Marks</button>
          </div>
          
          <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "20px", paddingBottom: "20px" }}>
            © copyrights 2026 AssessVerse
          </div>
        </main>
      </div>
    </div>
  );
};

export default EvaluationDetail;