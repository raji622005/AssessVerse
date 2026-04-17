import React, { useState, useEffect } from "react";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import axios from"../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const EvaluateAssessments = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [assessmentFilter, setAssessmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- 1. FETCH DATA ON MOUNT ---
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/api/submissions", config);
      setEvaluations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // --- 2. FILTER LOGIC ---
  const filteredEvaluations = evaluations.filter((item) => {
    // Accessing populated data from backend
    const currentAssessmentName = item.assessmentId?.title || item.assessmentName || "";
    const currentStudentName = item.userId?.name || item.userName || "";
    const currentStatus = item.status || "";

    const matchesName = currentStudentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesAssessment = 
      assessmentFilter === "All" || 
      currentAssessmentName === assessmentFilter;
    
    const matchesStatus = 
      statusFilter === "All" || 
      currentStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesName && matchesAssessment && matchesStatus;
  });

  // Get unique assessment names for the dropdown dynamically
  const uniqueAssessments = [
    "All",
    ...new Set(evaluations.map((item) => item.assessmentId?.title || item.assessmentName).filter(Boolean)),
  ];

  const styles = {
    pageWrapper: {
      display: "flex",
      width: "83vw",
      marginLeft: "235px",
      flexDirection: "column",
      marginTop: "100px",
      height: "100vh",
      backgroundColor: "#0A1230",
      color: "white",
      overflow: "hidden",
    },
    layoutBody: {
      display: "flex",
      flex: 1,
      overflow: "hidden",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      overflowY: "auto",
      backgroundColor: "#17276B",
    },
    titleRow: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "30px",
    },
    filterRow: {
      display: "flex",
      gap: "20px",
      marginBottom: "40px",
      flexWrap: "wrap",
    },
    filterDropdown: {
      backgroundColor: "white",
      color: "#333",
      padding: "8px 15px",
      borderRadius: "20px",
      fontSize: "14px",
      cursor: "pointer",
      border: "none",
      outline: "none",
    },
    searchInput: {
      backgroundColor: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 15px",
      fontSize: "14px",
      width: "250px",
      outline: "none",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      textAlign: "center",
    },
    th: {
      padding: "20px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    td: {
      padding: "15px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      fontSize: "16px",
      verticalAlign: "middle",
    },
    statusDot: (status) => ({
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "10px",
      backgroundColor: status?.toLowerCase() === "completed" ? "#00FF00" : "#FFD700",
      boxShadow: status?.toLowerCase() === "completed" ? "0 0 8px #00FF00" : "0 0 8px #FFD700",
    }),
    actionView: {
      color: "#48BB78",
      fontWeight: "bold",
      cursor: "pointer",
    },
    actionEvaluate: {
      fontWeight: "bold",
      cursor: "pointer",
    },
    footer: {
      textAlign: "center",
      padding: "15px",
      fontSize: "12px",
      opacity: 0.7,
      backgroundColor: "#0A1230",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <Headeri />

      <div style={styles.layoutBody}>
        <Sidebari />

        <main style={styles.mainContent}>
          <div style={styles.titleRow}>
            <span style={{ fontSize: "28px" }}>✔️</span>
            <h1 style={{ fontSize: "32px", margin: 0 }}>Evaluate Assessments</h1>
          </div>

          <div style={styles.filterRow}>
            <select 
              style={styles.filterDropdown}
              value={assessmentFilter}
              onChange={(e) => setAssessmentFilter(e.target.value)}
            >
              {uniqueAssessments.map((name) => (
                <option key={name} value={name}>{name === "All" ? "All Assessments" : name}</option>
              ))}
            </select>

            <select 
              style={styles.filterDropdown}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="completed">Completed</option>
              <option value="evaluated">Evaluated</option>
            </select>

            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search Student Name..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span style={{ position: "absolute", right: "12px", top: "8px", color: "#666" }}>🔍</span>
            </div>
          </div>

          <h2 style={styles.sectionTitle}>Assessments with Response and Status:</h2>

          {loading ? (
            <p style={{ textAlign: "center", fontSize: "18px" }}>Loading submissions...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Assessment Name</th>
                  <th style={styles.th}>Student Name</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvaluations.length > 0 ? (
                  filteredEvaluations.map((item) => (
                    <tr key={item._id}>
                      <td style={styles.td}>
                        {item.assessmentId?.title || "Untitled Assessment"}
                      </td>
                      <td style={styles.td}>
                        {item.userId?.name || "Unknown Student"}
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={styles.statusDot(item.status)}></span>
                          {item.status}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center" }}>
                          <span 
                            style={styles.actionView} 
                            onClick={() => navigate(`/view1-assessment/${item._id}`)}
                          >
                            VIEW
                          </span>
                          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                          <span 
                            style={{
                              ...styles.actionEvaluate,
                              color: item.status?.toLowerCase() === "evaluated" ? "#38BDF8" : "tomato",
                              opacity: item.status?.toLowerCase() === "evaluated" ? 0.8 : 1,
                              cursor: item.status?.toLowerCase() === "evaluated" ? "default" : "pointer"
                            }} 
                            onClick={() => {
                              if (item.status?.toLowerCase() !== "evaluated") {
                                navigate(`/edit1-assessment/${item._id}`);
                              }
                            }}
                          >
                            {item.status?.toLowerCase() === "evaluated" ? "✓ GRADED" : "EVALUATE"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={styles.td}>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </main>
      </div>

      <div style={styles.footer}>© copyrights 2026 AssessVerse</div>
    </div>
  );
};

export default EvaluateAssessments;