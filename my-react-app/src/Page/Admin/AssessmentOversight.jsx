import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "src/api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";

const AssessmentOversight = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllAssessments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/assessments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssessments(res.data);
    } catch (err) {
      console.error("Database fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAssessments();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      // Logic to toggle between Flagged and its original state
      const newStatus = currentStatus === "Flagged" ? "Published" : "Flagged";
      
      await axios.patch(`/api/admin/assessments/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchAllAssessments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const styles = {
    body: { margin: 0, width: "99vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B" },
    layoutContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", color: "white",marginLeft:"210px",marginTop:"90px" },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" },
    th: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "20px", fontWeight: "normal", backgroundColor: "rgba(255,255,255,0.05)" },
    td: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px" },
    actionBtn: (bgColor) => ({
      padding: "8px 16px",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: bgColor,
      fontFamily: "Acme",
      fontSize: "14px",
      transition: "0.3s opacity",
    })
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={styles.headerRow}>
            <h2>Assessment Oversight</h2>
          </div>

          <h3 style={{ marginBottom: "15px" }}>Assessment Table</h3>

          {loading ? (
            <p>Loading assessment data from database...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Instructor</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((item) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <td style={styles.td}>{item.title}</td>
                    
                    {/* FIXED INSTRUCTOR COLUMN */}
                    <td style={styles.td}>
                      {item.createdBy?.name || item.instructorName || "System Admin"}
                    </td>

                    <td style={styles.td}>{item.type || "MCQ"}</td>
                    
                    <td style={{ 
                      ...styles.td, 
                      color: item.status === "Published" ? "#4CAF50" : item.status === "Flagged" ? "#FF5252" : "#FFC107",
                      fontWeight: "bold"
                    }}>
                      {item.status}
                    </td>

                    
                    <td style={styles.td}>
                      {item.status === "Flagged" ? (
                        <button 
                          style={styles.actionBtn("#FF5252")}
                          onClick={() => toggleStatus(item._id, item.status)}
                        >
                          RESTORE
                        </button>
                      ) : (
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
{/* Inside your assessments.map((item) => ( ... )) */}
<button 
  style={styles.actionBtn("#4CAF50")}
  onClick={() => navigate(`/admin/view-assessment/${item._id}`)}
>
  VIEW
</button>                          
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <footer style={{ color: "white", textAlign: "center", marginTop: "40px", paddingBottom: "20px" }}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AssessmentOversight;