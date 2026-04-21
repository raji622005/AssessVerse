import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

/**
 * Extract the specific answer for a given question from a submission.
 * Handles ID matching, index matching, and nested object normalization.
 */
export const getSpecificAnswer = (submissionAnswers, question, index) => {
  // 1. NORMALIZE: Handle cases where answers are wrapped in a single-element array
  const allAnswers = Array.isArray(submissionAnswers)
    ? (submissionAnswers[0] || {})
    : (submissionAnswers || {});

  // 2. EXTRACTION: Find the answer by ID or index
  const rawValue = allAnswers[question?._id] ??
                   allAnswers[index.toString()] ??
                   allAnswers[index];

  // 3. CLEANING: Ensure we aren't returning a parent object
  if (rawValue === undefined || rawValue === null) {
    return "No answer provided.";
  }

  // If the extractor accidentally grabbed the whole object, drill down one more level
  if (typeof rawValue === "object" && !Array.isArray(rawValue)) {
    return rawValue[index] || rawValue[question?._id] || "No answer provided.";
  }

  return String(rawValue);
};

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

        const subRes = await axios.get(`/api/submissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const submission = subRes.data;

        if (submission) {
          const assessmentId = submission.assessmentId?._id || submission.assessmentId;
          const assessRes = await axios.get(`/api/assessments/${assessmentId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setData({
            submission: submission,
            assessment: assessRes.data,
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
    mainContent: { flex: 1, padding: "40px 140px", overflowY: "auto", backgroundColor: "#17276B", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
    headerText: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px", textTransform: "uppercase", borderBottom: "2px solid #48BB78", paddingBottom: "5px" },
    questionCard: { backgroundColor: "#D9D9D9", color: "black", padding: "30px", borderRadius: "15px", width: "80%", maxWidth: "800px", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" },
    fieldRow: { display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "15px", fontSize: "18px", width: "100%" },
    label: { fontWeight: "bold", width: "160px", flexShrink: 0, color: "#17276B", marginBottom: "5px" },
    line: { width: "100%", minHeight: "25px", color: "#333", whiteSpace: "pre-wrap", wordBreak: "break-word" },
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

          {/* Student Info Card */}
          <div style={{ ...styles.questionCard, backgroundColor: "#E2E8F0", marginBottom: "20px" }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <span style={styles.label}>Student Name:</span>
              <span style={styles.line}>
                {data.submission.userId?.name || data.submission.userId?.username || data.submission.studentName || "Unnamed Student"}
              </span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={styles.label}>Status:</span>
              <span style={{ color: data.submission.status === 'evaluated' ? '#48BB78' : '#ECC94B', fontWeight: 'bold' }}>
                {data.submission.status?.toUpperCase() || "PENDING"}
              </span>
            </div>
          </div>

          {/* Questions and Specific Answers Mapping */}
          {data.assessment?.questions?.map((q, index) => {
            // Call the utility function here
            const displayValue = getSpecificAnswer(data.submission?.answers, q, index);

            return (
              <div key={q._id || index} style={styles.questionCard}>
                {/* Question Block */}
                <div style={styles.fieldRow}>
                  <span style={styles.label}>Question {index + 1}:</span>
                  <div style={styles.line}>
                    {q.questionText || q.question || "Question text missing"}
                  </div>
                </div>

                {/* Answer Block */}
                <div style={styles.fieldRow}>
                  <span style={styles.label}>User Answer:</span>
                  <div style={{ 
                    ...styles.line, 
                    backgroundColor: "rgba(255,255,255,0.8)", 
                    padding: "12px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #17276B" 
                  }}>
                    {displayValue}
                  </div>
                </div>
              </div>
            );
          })}

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