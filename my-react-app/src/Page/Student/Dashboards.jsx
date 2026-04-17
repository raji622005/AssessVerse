import React, { useState, useEffect } from "react";
import axios from "src/api/axiosConfig";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";

const StudentDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalTaken: 0,
    averageScore: 0,
    pendingEvaluations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Fetching stats - we keep this so the top cards still work
        const response = await axios.get("/api/student/student-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setStatsData({
          totalTaken: response.data.totalTaken ?? 0,
          averageScore: response.data.averageScore ?? 0,
          pendingEvaluations: response.data.pendingEvaluations ?? 0,
        });
      } catch (err) {
        console.error("❌ Failed to fetch dashboard stats:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats(); 
  }, []); 

  const styles = {
    pageWrapper: { 
      margin: 0, 
      width: "100vw", 
      height: "100vh", 
      fontFamily: "'Acme', sans-serif", 
      backgroundColor: "#0A1230", 
      display: "flex", 
      flexDirection: "column", 
      overflow: "hidden" 
    },
    layoutBody: { 
      display: "flex", 
      flex: 1, 
      overflow: "hidden",
      width: "100%" 
    },
    mainContent: { 
      flex: 1, 
      backgroundColor: "#17276B", 
      marginTop: "80px", // Reduced from 100px for better fit
      marginLeft: "240px",
      marginRight: "20px",
      marginBottom: "20px",
      padding: "30px", 
      borderRadius: "20px", 
      display: "flex", 
      flexDirection: "column", 
      color: "white",
      overflowY: "auto", 
      boxSizing: "border-box"
    },
    welcomeRow: { 
      display: "flex", 
      alignItems: "center", 
      gap: "10px", 
      marginBottom: "20px" 
    },
    sectionTitle: { 
      fontSize: "20px", 
      fontWeight: "normal", 
      marginBottom: "15px",
      color: "#00C853" // Green accent to match branding
    },
    statsContainer: { 
      display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)", 
      backgroundColor: "#0A1230", 
      borderRadius: "15px", 
      overflow: "hidden", 
      marginBottom: "30px", 
      border: "1px solid rgba(255, 255, 255, 0.1)",
      width: "100%"
    },
    statCard: { 
      padding: "25px 15px", 
      textAlign: "center", 
      borderRight: "1px solid rgba(255, 255, 255, 0.1)" 
    },
    statLabel: { 
      color: "#94a3b8", 
      fontSize: "12px", 
      marginBottom: "8px", 
      textTransform: "uppercase",
      letterSpacing: "1px"
    },
    statValue: { 
      fontSize: "32px", 
      fontWeight: "bold",
      color: "#fff"
    },
    // New Styles for Terms & Steps
    infoContainer: {
      display: "flex",
      gap: "20px",
      width: "100%",
      flexWrap: "wrap"
    },
    infoCard: {
      flex: 1,
      minWidth: "350px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "15px",
      padding: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxSizing: "border-box"
    },
    cardTitle: {
      fontSize: "18px",
      color: "#00C853",
      marginBottom: "20px",
      borderBottom: "1px solid rgba(0, 200, 83, 0.2)",
      paddingBottom: "10px",
      fontWeight: "bold"
    },
    list: {
      paddingLeft: "18px",
      lineHeight: "1.8",
      fontSize: "14px",
      color: "#CBD5E0",
      margin: 0
    },
    stepItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "15px",
      marginBottom: "18px"
    },
    stepNumber: {
      backgroundColor: "#00C853",
      color: "white",
      minWidth: "26px",
      height: "26px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "13px",
      fontWeight: "bold"
    },
    stepText: {
      margin: 0,
      fontSize: "14px",
      color: "#CBD5E0",
      lineHeight: "1.5"
    },
    footer: { 
      textAlign: "center", 
      padding: "20px", 
      color: "#64748b", 
      fontSize: "11px", 
      marginTop: "auto" 
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={styles.layoutBody}>
        <Sidebars />
        <main style={styles.mainContent}>
          <div style={styles.welcomeRow}>
            <h2 style={{ margin: 0, fontSize: "36px" }}>Welcome! 👤</h2>
          </div>

          <section>
            <h3 style={styles.sectionTitle}>Quick Stats</h3>
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Assessments</p>
                <p style={styles.statValue}>{loading ? "..." : statsData.totalTaken}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Average Score</p>
                <p style={styles.statValue}>{loading ? "..." : statsData.averageScore}%</p>
              </div>
              <div style={{ ...styles.statCard, borderRight: "none" }}>
                <p style={styles.statLabel}>Pending Evaluations</p>
                <p style={styles.statValue}>{loading ? "..." : statsData.pendingEvaluations}</p>
              </div>
            </div>
          </section>

          {/* Replaced Performance Overview with Guidelines */}
          <section>
            <h3 style={styles.sectionTitle}>Unified Assessment Guidelines</h3>
            <div style={styles.infoContainer}>
              {/* Left Card: Terms & Conditions */}
              <div style={styles.infoCard}>
                <h4 style={styles.cardTitle}>Terms & Conditions</h4>
                <ul style={styles.list}>
                  <li>The timer starts immediately upon clicking "Start Test".</li>
                  <li>Do not refresh or close the tab during an active session.</li>
                  <li>System monitoring is active to detect tab switching.</li>
                  <li>All submissions are final and cannot be retaken unless authorized.</li>
                </ul>
              </div>

              {/* Right Card: Steps to Follow */}
              <div style={styles.infoCard}>
                <h4 style={styles.cardTitle}>Instructions</h4>
                <div style={styles.stepItem}>
                  <span style={styles.stepNumber}>1</span>
                  <p style={styles.stepText}>Visit the <strong>Assessment Catalog</strong> to view available tests.</p>
                </div>
                <div style={styles.stepItem}>
                  <span style={styles.stepNumber}>2</span>
                  <p style={styles.stepText}>Ensure you have <strong>60 minutes</strong> of uninterrupted time.</p>
                </div>
                <div style={styles.stepItem}>
                  <span style={styles.stepNumber}>3</span>
                  <p style={styles.stepText}>Answer all questions and click <strong>Submit</strong> before the timer expires.</p>
                </div>
                <div style={styles.stepItem}>
                  <span style={styles.stepNumber}>4</span>
                  <p style={styles.stepText}>View your results in the <strong>My Submissions</strong> section.</p>
                </div>
              </div>
            </div>
          </section>

          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;