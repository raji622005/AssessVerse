import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "src/api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewAssessment = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/assessments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssessment(res.data);
      } catch (err) {
        console.error("Error fetching assessment details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", display: "flex", flexDirection: "column" },
    layoutContainer: { display: "flex", flex: 1 },
    mainContent: { flex: 1, padding: "30px", color: "white", display: "flex", flexDirection: "column" },
    headerRow: { display: "flex", alignItems: "center", gap: "15px", fontSize: "24px", marginBottom: "30px", cursor: "pointer" },
    container: { display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" },
    card: { backgroundColor: "#D9D9D9", borderRadius: "20px", padding: "30px", color: "#17276B", width: "450px", minHeight: "500px", overflowY: "auto" },
    title: { color: "#8E44AD", fontSize: "22px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" },
    infoRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "18px" },
    label: { color: "#FF69B4", fontWeight: "bold" },
    btnGroup: { display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }
  };

  if (loading) return <div style={{color: "white", textAlign: "center", padding: "50px"}}>Loading Assessment...</div>;
  if (!assessment) return <div style={{color: "white", textAlign: "center", padding: "50px"}}>Assessment not found.</div>;

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={styles.headerRow} onClick={() => window.history.back()}>
            <IoArrowBackOutline />
            <span>View Assessment</span>
          </div>

          <div style={styles.container}>
            {/* Basic Information Card */}
            <div style={styles.card}>
              <div style={styles.title}>Basic Information</div>
              <div style={styles.infoRow}><span style={styles.label}>Title</span> <span>{assessment.title}</span></div>
              
              {/* Updated Instructor Field */}
              <div style={styles.infoRow}>
                <span style={styles.label}>Instructor</span> 
                <span>{assessment.createdBy?.name || "N/A"}</span> 
              </div>

              <div style={styles.infoRow}><span style={styles.label}>Status</span> <span>{assessment.status}</span></div>
              
              <div style={{...styles.title, marginTop: "30px"}}>Assessment Configuration</div>
              <div style={styles.infoRow}><span style={styles.label}>Questions</span> <span>{assessment.questions?.length || 0}</span></div>
              <div style={styles.infoRow}><span style={styles.label}>Duration</span> <span>{assessment.duration} Minutes</span></div>
              <div style={styles.infoRow}><span style={styles.label}>Pass %</span> <span>{assessment.passPercentage || 75} %</span></div>
              <div style={styles.title}>Question Preview</div>
  {assessment.questions && assessment.questions.length > 0 ? (
    assessment.questions.map((q, index) => (
      <p key={index}>
        {/* CHANGED q.questionText TO q.question TO MATCH DATABASE */}
        <strong>Q{index + 1}</strong> {q.question} 
      </p>
    ))
  ) : (
    <p>No questions available.</p>
  )}
            </div>

            {/* Updated Question Preview & Flags Card */}
                      </div>

          <footer style={{textAlign: "center", marginTop: "auto", padding: "20px"}}>
              © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ViewAssessment;