import React, { useState, useEffect } from "react";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";
import { Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "../../api/axiosConfig";

const AssessmentInterfaceCopy = () => {
  const { assessmentId } = useParams(); 
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      if (!assessmentId) return;
      try {
        setLoading(true);
        const res = await axios.get(`/api/assessments/get-assessment/${assessmentId}`);
        if (res.data) {
          setAssessment(res.data);
          setTimeLeft((res.data.duration || 30) * 60);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Failed to load assessment. Redirecting to catalog...");
        navigate("/assessmentcatalog"); 
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [assessmentId, navigate]);

  useEffect(() => {
    if (loading || timeLeft <= 0) {
      if (timeLeft === 0 && assessment) {
        handleSubmit(); 
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, timeLeft, assessment]);

  const handleSubmit = async () => {
    try {
      // 1. Get the user from localStorage to define userId
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const userId = storedUser?._id; 

      // 2. Validate session
      if (!userId || !token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      // 3. Construct the submission data
      const submissionData = {
        userId: userId,           // Fixed: Now defined from localStorage
        assessmentId: assessmentId, 
        answers: answers,         // Contains your MCQ or Text answers
        score: 0,                 // Default 0 for manual grading
        status: "Completed",      // Matches your model's enum
        submittedAt: new Date(),
      };

      console.log("Submitting Data:", submissionData);

      setLoading(true);
      
      // 4. Send the request
      const res = await axios.post("/api/submissions", submissionData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 5. Handle response based on your backend structure
      if (res.status === 201 || res.data.success) {
        alert("Assessment Submitted! Your instructor will grade it soon.");
        navigate("/Dashboards"); 
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || "Failed to submit assessment.");
    } finally {
      setLoading(false);
    }
  };
  const handleOptionSelect = (index, optIdx) => {
    setAnswers(prev => ({ ...prev, [index]: optIdx }));
  };

  const handleTextChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (loading) return (
    <div style={styles.loadingWrapper}>
      <Loader2 size={50} className="animate-spin" color="#00C853" />
      <p style={{ color: "white", marginTop: "10px" }}>Processing...</p>
    </div>
  );

  if (!assessment || !assessment.questions || assessment.questions.length === 0) {
    return <div style={styles.loadingWrapper}>No questions found for this assessment.</div>;
  }

  const currentQuestion = assessment.questions[currentIdx];
  const isMCQ = currentQuestion.choices && currentQuestion.choices.length > 0;

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={styles.layoutBody}>
        <Sidebars />
        <main style={styles.mainContent}>
          <div style={styles.headerRow}>
            <div>
              <h2 style={{ margin: 0 }}>{assessment.title}</h2>
              <span style={{ color: "#94A3B8" }}>{assessment.type || "General"} Assessment</span>
            </div>
            <div style={{ ...styles.timerBox, color: timeLeft < 60 ? "#FF4D4D" : "#00C853" }}>
              <Clock size={24} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div style={styles.questionCard}>
            <div style={styles.cardHeader}>
              <span>Question {currentIdx + 1} of {assessment.questions.length}</span>
            </div>

            <div style={styles.questionBody}>
              <h3 style={styles.questionText}>
                {currentQuestion.question || currentQuestion.text}
              </h3>
              
              {isMCQ ? (
                <div style={styles.optionsGrid}>
                  {currentQuestion.choices.map((option, i) => {
                    const isSelected = answers[currentIdx] === i;
                    return (
                      <div 
                        key={i} 
                        onClick={() => handleOptionSelect(currentIdx, i)}
                        style={{
                          ...styles.optionPill,
                          backgroundColor: isSelected ? "#00C853" : "white",
                          color: isSelected ? "white" : "#17276B",
                          borderColor: isSelected ? "#00C853" : "#E2E8F0"
                        }}
                      >
                        <strong>{String.fromCharCode(65 + i)}</strong> {option}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={styles.textAnswerContainer}>
                  <textarea
                    placeholder="Type your answer here..."
                    style={styles.answerTextArea}
                    value={answers[currentIdx] || ""}
                    onChange={(e) => handleTextChange(currentIdx, e.target.value)}
                  />
                  <p style={styles.charCount}>
                    Characters: {(answers[currentIdx] || "").length}
                  </p>
                </div>
              )}
            </div>

            <div style={styles.footerNav}>
              <button 
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                style={{ ...styles.navBtn, opacity: currentIdx === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft /> Previous
              </button>

              {currentIdx === assessment.questions.length - 1 ? (
                <button style={styles.submitBtn} onClick={handleSubmit}>
                  FINISH TEST
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  style={styles.navBtn}
                >
                  Next <ChevronRight />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { width: "100vw", height: "100vh", backgroundColor: "#0A1230", display: "flex", flexDirection: "column", overflow: "hidden" },
  layoutBody: { display: "flex", flex: 1, overflow: "hidden" },
  mainContent: { flex: 1, backgroundColor: "#17276B", padding: "40px", marginTop: "100px", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center" },
  headerRow: { width: "100%", maxWidth: "900px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", color: "white" },
  timerBox: { display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: "bold", backgroundColor: "rgba(0,0,0,0.3)", padding: "10px 20px", borderRadius: "15px" },
  questionCard: { width: "100%", maxWidth: "900px", backgroundColor: "#F8FAFC", borderRadius: "20px", padding: "30px", display: "flex", flexDirection: "column", minHeight: "500px" },
  cardHeader: { color: "#64748B", fontWeight: "bold", borderBottom: "1px solid #E2E8F0", paddingBottom: "15px", marginBottom: "20px" },
  questionText: { color: "#1E293B", fontSize: "22px", marginBottom: "30px" },
  optionsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  optionPill: { padding: "15px 25px", borderRadius: "12px", border: "2px solid #E2E8F0", cursor: "pointer", transition: "0.2s", fontSize: "16px", display: "flex", gap: "10px", alignItems: "center" },
  textAnswerContainer: { width: "100%", display: "flex", flexDirection: "column", gap: "10px" },
  answerTextArea: { width: "95%", minHeight: "200px", padding: "20px", borderRadius: "12px", border: "2px solid #E2E8F0", fontSize: "16px", fontFamily: "inherit", resize: "vertical", outline: "none" },
  charCount: { alignSelf: "flex-end", color: "#64748B", fontSize: "14px", margin: 0, marginRight: "5%" },
  footerNav: { marginTop: "auto", display: "flex", justifyContent: "space-between", paddingTop: "30px" },
  navBtn: { display: "flex", alignItems: "center", gap: "5px", padding: "10px 20px", border: "none", backgroundColor: "#17276B", color: "white", borderRadius: "8px", cursor: "pointer" },
  submitBtn: { padding: "10px 30px", border: "none", backgroundColor: "#00C853", color: "white", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
  loadingWrapper: { height: "100vh", width: "100vw", backgroundColor: "#0A1230", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", gap: "20px" }
};

export default AssessmentInterfaceCopy;