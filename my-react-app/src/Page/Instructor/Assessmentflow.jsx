import React, { useState } from "react";
import CreateAssessment from "./Create";
import CreateMCQ from "./Mcq";
import CreateShort from "./Short";
import CreateLong from "./Long";

const AssessmentFlow = () => {
  const [step, setStep] = useState("DETAILS");
  const [assessmentData, setAssessmentData] = useState({
    title: "", 
    description: "",
    duration: "60",
    tags: [],
    questions: [],
  });

  const handleStartFlow = (details) => {
    setAssessmentData((prev) => ({ ...prev, ...details }));
    setStep(details.nextStep || "MCQ");
  };

  const addQuestion = (newQuestion) => {
    setAssessmentData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

 const handleSaveAssessment = async (status) => {
    if (assessmentData.questions.length === 0) {
      alert("Please add at least one question first.");
      return;
    }

    const token = localStorage.getItem("token"); 
    
    // Ensure all marks are numbers to prevent schema validation errors
    const sanitizedQuestions = assessmentData.questions.map(q => ({
      ...q,
      marks: Number(q.marks) || 0
    }));

    const finalData = {
      title: assessmentData.title,
      description: assessmentData.description,
      duration: Number(assessmentData.duration),
      tags: assessmentData.tags,
      questions: sanitizedQuestions,
      status: status, // Matches "Published" or "Draft" in DB
    };

    try {
      const response = await fetch("/api/assessments/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Assessment saved!`);
        window.location.href = "/manage"; 
      } else {
        // This alerts you to the EXACT validation error from MongoDB
        alert(`Error: ${data.message}`); 
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  return (
    <div style={{ margin: 0, width: "100vw", minHeight: "100vh", backgroundColor: "#0A1230", color: "white" }}>
      <main style={{ padding: "20px" }}>
        {step === "DETAILS" && <CreateAssessment onNext={handleStartFlow} />}
        
        {step === "MCQ" && (
          <CreateMCQ 
            onSave={addQuestion} 
            onFinish={handleSaveAssessment} 
            setStep={setStep} 
          />
        )}
        
        {step === "SHORT" && (
          <CreateShort 
            onSave={addQuestion} 
            onFinish={handleSaveAssessment} 
            setStep={setStep} 
          />
        )}
        
        {step === "LONG" && (
          <CreateLong 
            onSave={addQuestion} 
            onFinish={handleSaveAssessment} 
            setStep={setStep} 
          />
        )}
      </main>
    </div>
  );
};

export default AssessmentFlow;