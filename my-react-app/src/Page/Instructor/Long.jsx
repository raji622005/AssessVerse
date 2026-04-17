import React, { useState } from "react";

const CreateLong = ({ onSave, onFinish, setStep }) => {
  const [question, setQuestion] = useState("");

  const handleSaveOnly = () => {
    if (!question.trim()) return alert("Question cannot be empty");
    onSave({ question, type: "LONG", marks: 10, options: [], correctAnswer: "" });
    setQuestion("");
    alert("Long Question Saved!");
  };

  const handleFinishAction = (status) => {
    if (question.trim() !== "") {
      onSave({ question, type: "LONG", marks: 10, options: [], correctAnswer: "" });
    }
    onFinish(status);
  };

  const styles = {
    container: { padding: "40px", color: "white" },
    card: { backgroundColor: "#D9D9D9", padding: "30px", borderRadius: "15px", color: "black" },
    input: { width: "100%", background: "none", borderBottom: "1px solid #333", color: "black", padding: "10px", outline: "none", fontSize: "18px", marginBottom: "20px" },
    buttonGroup: { display: "flex", gap: "10px", marginTop: "30px", flexWrap: "wrap" },
    btn: { padding: "12px 20px", cursor: "pointer", borderRadius: "8px", border: "none", fontWeight: "bold" }
  };

  return (
    <div style={styles.container}>
      <h2>SECTION : LONG ANSWER</h2>
      <div style={styles.card}>
        <label style={{ fontWeight: "bold" }}>Description / Question :</label>
        <input style={styles.input} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter Long Answer Question" />
        <div style={styles.buttonGroup}>
          <button style={{ ...styles.btn, backgroundColor: "#4A5568", color: "white" }} onClick={handleSaveOnly}>Save & Add Another</button>
          <button style={{ ...styles.btn, backgroundColor: "#4A5568", color: "white" }} onClick={() => setStep("MCQ")}>Back to MCQ</button>
          <button style={{ ...styles.btn, backgroundColor: "#ECC94B", color: "black" }} onClick={() => handleFinishAction("Draft")}>Save as Draft</button>
          <button style={{ ...styles.btn, backgroundColor: "#48BB78", color: "white" }} onClick={() => handleFinishAction("Published")}>Publish All</button>
        </div>
      </div>
    </div>
  );
};

export default CreateLong;