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
    status: status,
  };

  try {
    const API_BASE_URL = "https://assessverse.onrender.com";

    // ✅ FIXED: Added backticks around the URL
    const response = await fetch(`${API_BASE_URL}/api/assessments/create`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // ✅ FIXED: Added backticks around Bearer token
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(finalData),
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const errorText = await response.text();
      console.error("Server sent non-JSON response:", errorText);
      alert("Server Error: Check console for details.");
      return;
    }

    if (response.ok) {
      // ✅ FIXED: Added quotes around the message
      alert("Assessment saved!");
      window.location.href = "/manage"; 
    } else {
      alert(`Error: ${data.message || "Something went wrong"}`); 
    }
  } catch (error) {
    console.error("Network/Connection Error:", error);
    alert("Could not connect to the server.");
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