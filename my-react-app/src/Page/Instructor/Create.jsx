import React, { useState, useRef } from "react";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const CreateAssessment = ({ onNext }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "60"
  });
  const [tags, setTags] = useState(["React", "JavaScript", "Java"]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagValue, setNewTagValue] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = (type) => {
    if (!formData.title) {
      alert("Please enter an assessment title.");
      return;
    }
    // Pass the state values back to the Flow component
    onNext({
      ...formData,
      tags: tags,
      nextStep: type
    });
  };

  const styles = {
    body: { margin: 0, minwidth: "70vw", minHeight:"40vh", backgroundColor: "#0A1230", color: "white" },
    layout: { display: "flex", marginTop: "70px" },
    sidebarWrapper: { position: "fixed", top: "60px", left: 0, width: "220px", height: "calc(100vh - 80px)", zIndex: 999 },
    main: { flex: 1, backgroundColor: "#17276B", padding: "40px", marginLeft: "230px" },
    label: { display: "block", fontSize: "24px", fontWeight: "bold", marginBottom: "15px" },
    underlineInput: { width: "100%", background: "transparent", border: "none", borderBottom: "1px solid white", color: "white", fontSize: "18px", padding: "8px 0", outline: "none", marginBottom: "35px" },
    textArea: { width: "100%", backgroundColor: "#D9D9D9", borderRadius: "10px", padding: "20px", height: "120px", border: "none", fontSize: "18px", color: "black", marginBottom: "35px", resize: "none" },
    tagBox: { border: "1px solid #666", padding: "4px 12px", borderRadius: "10px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" },
    dropdown: { backgroundColor: "white", borderRadius: "25px", padding: "8px 20px", display: "flex", alignItems: "center", gap: "10px", color: "black", cursor: "pointer", fontWeight: "bold" },
  };

  return (
    <div style={styles.body}>
      <Headeri />
      <div style={styles.layout}>
        <div style={styles.sidebarWrapper}><Sidebari /></div>
        <main style={styles.main}>
          <h1 style={{ fontSize: "32px" }}>⊕ Create Assessment</h1>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "50px" }}>
            <div>
              <label style={styles.label}>Title :</label>
              <input name="title" value={formData.title} onChange={handleInputChange} style={styles.underlineInput} placeholder="React Test" />

              <label style={styles.label}>Description :</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} style={styles.textArea} placeholder="Brief assessment summary..." />

              <label style={styles.label}>Duration (Min) :</label>
              <input name="duration" type="number" value={formData.duration} onChange={handleInputChange} style={{ ...styles.underlineInput, width: "100px" }} />
            </div>

            <div>
              <label style={styles.label}>Select First Section to Add :</label>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={styles.dropdown} onClick={() => handleProceed("MCQ")}>MCQ <span>⌵</span></div>
                <div style={styles.dropdown} onClick={() => handleProceed("SHORT")}>Short <span>⌵</span></div>
                <div style={styles.dropdown} onClick={() => handleProceed("LONG")}>Long <span>⌵</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateAssessment;