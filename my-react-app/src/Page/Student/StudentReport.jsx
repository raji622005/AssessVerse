import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from"../../api/axiosConfig";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";

const StudentReport = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      // Don't make the request if submissionId is missing or "undefined" string
      if (!submissionId || submissionId === "undefined") return; 

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/submissions/${submissionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
}, [submissionId]);

  const styles = {
    pageWrapper: { 
      width: "100vw", 
      height: "100vh", 
      backgroundColor: "#0A1230", 
      display: "flex", 
      flexDirection: "column",
      overflow: "hidden" 
    },
    layoutBody: { 
      display: "flex", 
      flex: 1, 
      overflow: "hidden" 
    },
    mainContent: { 
      flex: 1, 
      backgroundColor: "#17276B", 
      padding: "40px", 
      marginTop: "100px",
      marginLeft:"190px", // Adjusted for Header height
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    backNav: {
      alignSelf: "flex-start",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "white",
      cursor: "pointer",
      fontSize: "20px",
      marginBottom: "30px",
      backgroundColor: "transparent",
      border: "none"
    },
    reportCard: {
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "50px",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1fr 200px",
      gap: "20px",
      color: "#334155"
    },
    detailsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    detailItem: {
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      fontSize: "20px",
      alignItems: "center"
    },
    label: {
      fontWeight: "bold",
      color: "#1E293B"
    },
    value: {
      color: "#64748B"
    },
    illustration: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    },
    badgeText: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#64748B",
      marginBottom: "5px",
      textTransform: "uppercase"
    },
    footer: {
      marginTop: "auto",
      padding: "20px",
      color: "rgba(255,255,255,0.5)",
      fontSize: "12px"
    }
  };

  if (loading) return (
    <div style={{...styles.pageWrapper, justifyContent: 'center', alignItems: 'center'}}>
      <Loader2 className="animate-spin" size={48} color="#00C853" />
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={styles.layoutBody}>
        <Sidebars />
        <main style={styles.mainContent}>
          
          <button style={styles.backNav} onClick={() => navigate(-1)}>
            <ArrowLeft size={24} /> Back to Submission
          </button>

          <div style={styles.reportCard}>
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
  <span style={styles.label}>Assessment Name</span>
  <span style={styles.value}>
    {report?.assessmentId?.title || "N/A"}
  </span>
</div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Date Taken</span>
                <span style={styles.value}>
                  {report?.createdAt ? new Date(report.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Score</span>
                <span style={styles.value}>{report?.score}/100</span>
              </div>
              <div style={styles.detailItem}>
  <span style={styles.value}>
    {report?.assessmentId?.instructorName }
  </span>
</div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Status</span>
                <span style={{...styles.value, color: report?.status === "Evaluated" ? "#00C853" : "#FFB300"}}>
                  {report?.status}
                </span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Instructor Feedback</span>
                <span style={styles.value}>{report?.feedback || "Good"}</span>
              </div>
            </div>

            <div style={styles.illustration}>
               <span style={styles.badgeText}>Assessment</span>
               <div style={{ color: "#3B82F6" }}>
                  <FileText size={100} strokeWidth={1} />
               </div>
               {/* Small checkmark badge similar to your image */}
               <div style={{
                 backgroundColor: "#3B82F6", 
                 borderRadius: "50%", 
                 padding: "5px", 
                 marginTop: "-25px",
                 marginLeft: "40px",
                 border: "4px solid white"
               }}>
                 <div style={{color: "white", fontSize: "10px", fontWeight: "bold"}}>✓</div>
               </div>
            </div>
          </div>

          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </main>
      </div>
    </div>
  );
};

export default StudentReport;