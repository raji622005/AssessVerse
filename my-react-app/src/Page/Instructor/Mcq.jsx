import React, { useState } from "react";

const CreateMCQ = ({ onSave, onFinish, setStep }) => {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: null,
    marks: 5
  });

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSaveOnly = () => {
    if (!formData.question.trim() || formData.correctAnswer === null) {
      alert("Please fill the question and select a correct answer.");
      return;
    }
    onSave({ ...formData, type: "MCQ" });
    setFormData({ question: "", options: ["", "", "", ""], correctAnswer: null, marks: 5 });
    alert("MCQ Added!");
  };

  const handleFinishAction = (status) => {
    // Auto-save the current question if it's valid but not yet "added"
    if (formData.question.trim() !== "" && formData.correctAnswer !== null) {
      onSave({ ...formData, type: "MCQ" });
    }
    onFinish(status); // Pass 'Draft' or 'Published' to AssessmentFlow
  };

  const styles = {
    container: { padding: "40px", color: "white" },
    card: { backgroundColor: "#D9D9D9", padding: "30px", borderRadius: "15px", color: "black" },
    input: { width: "100%", background: "none", borderBottom: "1px solid #333", color: "black", marginBottom: "20px", padding: "10px", outline: "none" },
    buttonGroup: { display: "flex", gap: "10px", marginTop: "30px", flexWrap: "wrap" },
    btn: { padding: "10px 15px", cursor: "pointer", borderRadius: "8px", border: "none", fontWeight: "bold" }
  };

  return (
    <div style={styles.container}>
      <h2>SECTION : MCQ</h2>
      <div style={styles.card}>
        <label style={{ fontWeight: "bold" }}>Question :</label>
        <input style={styles.input} value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} placeholder="Enter MCQ Question" />
        
        {formData.options.map((opt, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <input type="radio" name="correct" checked={formData.correctAnswer === idx} onChange={() => setFormData({...formData, correctAnswer: idx})} />
            <input style={{ ...styles.input, marginBottom: 0 }} placeholder={`Option ${idx + 1}`} value={opt} onChange={(e) => handleOptionChange(idx, e.target.value)} />
          </div>
        ))}

        <div style={styles.buttonGroup}>
          <button style={{ ...styles.btn, backgroundColor: "#4A5568", color: "white" }} onClick={handleSaveOnly}>Save & Add Another</button>
          <button style={{ ...styles.btn, backgroundColor: "#E53E3E", color: "white" }} onClick={() => setStep("SHORT")}>Move to Short Answer</button>
          <button style={{ ...styles.btn, backgroundColor: "#ECC94B", color: "black" }} onClick={() => handleFinishAction("Draft")}>Save as Draft</button>
          <button style={{ ...styles.btn, backgroundColor: "#48BB78", color: "white" }} onClick={() => handleFinishAction("Published")}>Publish All</button>
        </div>
      </div>
    </div>
  );
};

export default CreateMCQ;