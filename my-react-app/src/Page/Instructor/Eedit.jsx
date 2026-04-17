import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "src/api/axiosConfig";
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
        const res = await axios.get(`/api/data/get-assessment/${id}`);
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
    updated[index][field] = value;
    setFormData({ ...formData, questions: updated });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/data/update-assessment/${id}`, formData);
      alert("✅ Assessment updated successfully!");
      navigate(`/view-assessment/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Save failed.");
    }
  };

  const styles = {
    pageWrapper: { width: "100vw", minHeight: "100vh", backgroundColor: "#0A1230", display: "flex", flexDirection: "column", fontFamily: "inherit" },
    layoutBody: { display: "flex", flex: 1, marginTop: "70px" },
    mainContent: { flex: 1, backgroundColor: "#121C4E", padding: "30px 50px", marginLeft: "250px", color: "white" },
    titleHeader: { display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", marginBottom: "30px" },
    detailsLabel: { color: "#A0AEC0", fontSize: "14px", display: "block", marginBottom: "5px" },
    inputInline: { background: "none", border: "none", color: "white", fontSize: "16px", outline: "none", width: "70%", marginBottom: "15px" },
    sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    card: { backgroundColor: "#CBD5E0", borderRadius: "12px", padding: "20px", color: "#2D3748", marginBottom: "20px", position: "relative" },
    addBtn: { backgroundColor: "white", color: "#2D3748", padding: "6px 15px", borderRadius: "20px", cursor: "pointer", border: "1px solid #CBD5E0", marginLeft: "10px", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px" },
    saveBtn: { backgroundColor: "#2D3748", color: "white", padding: "10px 30px", borderRadius: "20px", border: "none", fontWeight: "bold", cursor: "pointer" },
    correctBadge: { fontSize: "10px", backgroundColor: "#48BB78", color: "white", padding: "2px 6px", borderRadius: "4px", marginLeft: "10px" }
  };

  if (loading) return <div style={{ color: "white", textAlign: "center", padding: "100px" }}>Loading...</div>;

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <main style={styles.mainContent}>
          <div style={styles.titleHeader}>
            <span onClick={()=>{navigate("/manage")}} style={{opacity: 0.7, cursor: "pointer"}}>⚙️ Manage Assessment</span> 
            <span style={{opacity: 0.7}}> &gt; </span> 
            <span style={{fontWeight: "bold"}}>Edit Assessment</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "60px" }}>
            {/* Left Column */}
            <div>
              <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px"}}>
                 <span style={{fontSize: "20px"}}> Edit : {formData.title}</span>
              </div>
              <h4 style={{marginBottom: "20px", borderBottom: "1px solid #2D3748", paddingBottom: "10px"}}>Assessment Details</h4>
              <div style={{marginBottom: "15px"}}><span style={styles.detailsLabel}>Name: </span><input name="title" value={formData.title} onChange={handleMetaChange} style={styles.inputInline} /></div>
              <div style={{marginBottom: "15px"}}><span style={styles.detailsLabel}>Description: </span><input name="description" value={formData.description} onChange={handleMetaChange} style={styles.inputInline} /></div>
              <div style={{marginBottom: "15px"}}><span style={styles.detailsLabel}>Total Duration: </span><input name="duration" type="number" value={formData.duration} onChange={handleMetaChange} style={{...styles.inputInline, width: "40px"}} /> min</div>
              <div style={{marginBottom: "15px"}}><span style={styles.detailsLabel}>Total Marks: </span><span style={{fontSize: "16px"}}>{formData.totalMarks} Marks</span></div>
              <div style={{marginBottom: "15px"}}><span style={styles.detailsLabel}>Total Questions: </span><span style={{fontSize: "16px"}}>{formData.totalQuestions} Questions</span></div>
              <div style={{marginBottom: "15px"}}>
                <span style={styles.detailsLabel}>Status: </span>
                <select name="status" value={formData.status} onChange={handleMetaChange} style={{background: "none", border: "none", color: "white", fontSize: "16px", outline: "none"}}>
                   <option value="Published" style={{color: "black"}}>Published</option>
                   <option value="Draft" style={{color: "black"}}>Draft</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div style={styles.sectionHeader}>
                <span>➕ Add Question</span>
                <div style={{display: "flex"}}>
                   <button onClick={() => addQuestion("MCQ")} style={styles.addBtn}>MCQ</button>
                   <button onClick={() => addQuestion("SHORT")} style={styles.addBtn}>Short</button>
                   <button onClick={() => addQuestion("LONG")} style={styles.addBtn}>Long</button>
                </div>
              </div>

              <div style={{maxHeight: "60vh", overflowY: "auto", paddingRight: "10px"}}>
                {formData.questions.map((q, index) => (
                  <div key={index} style={styles.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px solid #A0AEC0", paddingBottom: "5px" }}>
                      <span>Type : <strong>{q.type}</strong></span>
                      <div style={{display: "flex", gap: "10px"}}>
                        <span>Marks: </span>
                        <input type="number" value={q.marks} onChange={(e) => handleQuestionChange(index, "marks", e.target.value)} style={{width: "40px", border: "none", background: "white", borderRadius: "4px", padding: "0 4px"}}/>
                      </div>
                    </div>
                    
                    <div style={{display: "flex", gap: "10px", alignItems: "flex-start"}}>
                      <span>{index + 1}. </span>
                      <input 
                        value={q.question} 
                        onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                        style={{ width: "100%", background: "none", border: "none", borderBottom: "1px dashed #718096", outline: "none", marginBottom: "15px", fontWeight: "600" }} 
                      />
                    </div>

                    {/* Only show correct answer selection for MCQ */}
                    {q.type === "MCQ" ? (
                      <div style={{marginLeft: "20px"}}>
                        <p style={{fontSize: "12px", color: "#4A5568", marginBottom: "10px"}}>Select the correct option:</p>
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
                              style={{background: "none", border: "none", fontSize: "14px", flex: 1, borderBottom: "1px solid #A0AEC0"}}
                            />
                            {Number(q.correctAnswer) === oIdx && <span style={styles.correctBadge}>Correct Answer</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* For Short and Long, we display a placeholder or word count limit info instead of an answer box */
                      <div style={{marginLeft: "20px", marginTop: "10px", color: "#718096", fontSize: "13px", fontStyle: "italic"}}>
                        Word limit: {q.type === "SHORT" ? "50 words" : "500 words"}. No expected answer required.
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "none", color: "white", border: "1px solid white", padding: "8px 25px", borderRadius: "20px", cursor: "pointer" }}>Back</button>
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