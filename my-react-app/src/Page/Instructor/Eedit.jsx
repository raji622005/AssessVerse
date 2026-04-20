import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const Eedit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Published",
    duration: 60,
    totalMarks: 0,
    totalQuestions: 0,
    questions: []
  });

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axios.get(`/api/assessment-data/get-assessment/${id}`);
        if (res.data) {
          setFormData({
            ...res.data,
            questions: res.data.questions || []
          });
        }
      } catch (err) {
        console.error("Error loading assessment:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAssessment();
  }, [id]);

  useEffect(() => {
    const marks = formData.questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
    const count = formData.questions.length;
    setFormData(prev => ({ ...prev, totalMarks: marks, totalQuestions: count }));
  }, [formData.questions]);

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addQuestion = (type) => {
    const newQ = {
      type: type.toUpperCase(),
      question: `New ${type} Question`,
      marks: type === "LONG" ? 10 : 5,
      options: type === "MCQ" ? ["Option 1", "Option 2", "Option 3", "Option 4"] : [],
      correctAnswer: type === "MCQ" ? 0 : ""
    };
    setFormData(prev => ({ ...prev, questions: [...prev.questions, newQ] }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...formData.questions];
    updated[index][field] = field === "marks" ? Number(value) : value;
    setFormData({ ...formData, questions: updated });
  };

  const handleUpdate = async () => {
    // 1. Final recalculation of marks to ensure accuracy
    const finalMarks = formData.questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
    const finalQuestionCount = formData.questions.length;

    // 2. Construct the clean payload
    const finalData = { 
        ...formData, 
        totalMarks: finalMarks,
        totalQuestions: finalQuestionCount 
    };

    try {
      setLoading(true); // Feedback for the user
      const response = await axios.put(`/api/assessment-data/update-assessment/${id}`, finalData);
      
      if (response.status === 200 || response.status === 201) {
        alert(`✅ Assessment updated successfully! Total Marks: ${finalMarks}`);
        navigate(`/view-assessment/${id}`);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Save failed. Check if all fields are filled correctly.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    pageWrapper: { width: "100vw", minHeight: "100vh", backgroundColor: "#0A1230", display: "flex", flexDirection: "column" },
    layoutBody: { display: "flex", flex: 1, marginTop: "70px" },
    mainContent: { flex: 1, backgroundColor: "#121C4E", padding: "30px 50px", marginLeft: "250px", color: "white" },
    titleHeader: { display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", marginBottom: "30px" },
    detailsLabel: { color: "#A0AEC0", fontSize: "14px", display: "block", marginBottom: "5px" },
    inputInline: { background: "none", border: "none", color: "white", fontSize: "16px", outline: "none", width: "70%", marginBottom: "15px" },
    sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    card: { backgroundColor: "#CBD5E0", borderRadius: "12px", padding: "20px", color: "#2D3748", marginBottom: "20px" },
    addBtn: { backgroundColor: "white", color: "#2D3748", padding: "6px 15px", borderRadius: "20px", cursor: "pointer", border: "1px solid #CBD5E0", marginLeft: "10px", fontWeight: "600" },
    saveBtn: { backgroundColor: "#2D3748", color: "white", padding: "10px 30px", borderRadius: "20px", border: "none", fontWeight: "bold", cursor: "pointer" },
  };

  if (loading) return <div style={{ color: "white", textAlign: "center", padding: "100px" }}>Loading...</div>;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          <div style={styles.titleHeader}>
            <span onClick={() => navigate("/manage")} style={{ opacity: 0.7, cursor: "pointer" }}>⚙️ Manage Assessment</span>
            <span style={{ opacity: 0.7 }}> &gt; </span>
            <span style={{ fontWeight: "bold" }}>Edit Assessment</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "60px" }}>
            <div>
              <h4 style={{ marginBottom: "20px", borderBottom: "1px solid #2D3748", paddingBottom: "10px" }}>Assessment Details</h4>
              <div style={{ marginBottom: "15px" }}><span style={styles.detailsLabel}>Name: </span><input name="title" value={formData.title} onChange={handleMetaChange} style={styles.inputInline} /></div>
              <div style={{ marginBottom: "15px" }}><span style={styles.detailsLabel}>Description: </span><input name="description" value={formData.description} onChange={handleMetaChange} style={styles.inputInline} /></div>
              <div style={{ marginBottom: "15px" }}><span style={styles.detailsLabel}>Total Duration (min): </span><input name="duration" type="number" value={formData.duration} onChange={handleMetaChange} style={{ ...styles.inputInline, width: "60px" }} /></div>
              <div style={{ marginBottom: "15px" }}><span style={styles.detailsLabel}>Total Marks: </span><span style={{ fontSize: "16px", fontWeight: "bold", color: "#48BB78" }}>{formData.totalMarks} Marks</span></div>
            </div>

            <div>
              <div style={styles.sectionHeader}>
                <span>➕ Add Question</span>
                <div style={{ display: "flex" }}>
                  <button onClick={() => addQuestion("MCQ")} style={styles.addBtn}>MCQ</button>
                  <button onClick={() => addQuestion("SHORT")} style={styles.addBtn}>Short</button>
                  <button onClick={() => addQuestion("LONG")} style={styles.addBtn}>Long</button>
                </div>
              </div>

              <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "10px" }}>
                {formData.questions.map((q, index) => (
                  <div key={index} style={styles.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <span>Type: <strong>{q.type}</strong></span>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span>Marks: </span>
                        <input type="number" value={q.marks} onChange={(e) => handleQuestionChange(index, "marks", e.target.value)} style={{ width: "45px", textAlign: "center" }} />
                      </div>
                    </div>

                    <input 
                      value={q.question} 
                      onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                      style={{ width: "100%", background: "none", border: "none", borderBottom: "1px dashed #718096", marginBottom: "15px", fontWeight: "600" }} 
                    />

                    {/* CORRECT ANSWER SECTION */}
                    <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "bold", color: "#4A5568" }}>Set Correct Answer:</span>
                      
                      {q.type === "MCQ" ? (
                        <div style={{ marginTop: "10px" }}>
                          {q.options?.map((opt, oIdx) => (
                            <div key={oIdx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                              <input 
                                type="radio" 
                                name={`correct-${index}`} 
                                checked={Number(q.correctAnswer) === oIdx} 
                                onChange={() => handleQuestionChange(index, "correctAnswer", oIdx)}
                              />
                              <input 
                                value={opt} 
                                onChange={(e) => {
                                  const newOpts = [...q.options];
                                  newOpts[oIdx] = e.target.value;
                                  handleQuestionChange(index, "options", newOpts);
                                }} 
                                style={{ background: "none", border: "none", borderBottom: "1px solid #A0AEC0", flex: 1 }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input 
                          placeholder="Enter exact expected answer for auto-scoring..."
                          value={q.correctAnswer || ""} 
                          onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                          style={{ width: "100%", marginTop: "5px", padding: "8px", borderRadius: "4px", border: "1px solid #A0AEC0" }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "none", color: "white", border: "1px solid white", padding: "8px 25px", borderRadius: "20px" }}>Cancel</button>
                <button onClick={handleUpdate} style={styles.saveBtn}>Save Changes</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Eedit;