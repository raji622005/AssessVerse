import React, { useState, useEffect } from "react";
import axios from "src/api/axiosConfig";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  // 1. Fetch Submissions from Backend
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        // Replace with your actual backend endpoint
        const res = await axios.get("/api/submissions/my-history", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submission history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const styles = {
    pageWrapper: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "'Acme', sans-serif", backgroundColor: "#0A1230", display: "flex", flexDirection: "column" },
    layoutBody: { display: "flex", flex: 1 },
    mainContent: { marginLeft:"250px",marginTop:"100px",flex: 1, backgroundColor: "#17276B", padding: "40px", display: "flex", flexDirection: "column", color: "white" },
    titleRow: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" },
    subTitle: { fontSize: "24px", fontWeight: "normal", marginBottom: "30px", marginLeft: "45px" },
    tableContainer: { width: "100%", borderCollapse: "collapse", marginTop: "10px", border: "1px solid rgba(255,255,255,0.3)" },
    th: { padding: "20px", border: "1px solid rgba(255,255,255,0.3)", fontSize: "18px", textAlign: "center", backgroundColor: "rgba(255,255,255,0.05)", fontWeight: "normal" },
    td: { padding: "25px 20px", border: "1px solid rgba(255,255,255,0.3)", textAlign: "center", fontSize: "16px" },
    viewLink: { color: "#00C853", textDecoration: "none", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase" },
    statusBadge: (status) => ({
      color: (status === "Evaluated"|| status === "Completed" )? "#FFB300" :  "#00C853",
      fontWeight: "bold"
    }),
    footer: { textAlign: "center", padding: "20px", color: "#CBD5E0", fontSize: "12px", marginTop: "auto" },
  };

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={styles.layoutBody}>
        <Sidebars />
        <main style={styles.mainContent}>
          <div style={styles.titleRow}>
            <CheckCircle size={32} />
            <h2 style={{ margin: 0, fontSize: "32px" }}>My submissions</h2>
          </div>

          <h3 style={styles.subTitle}>Assessment History</h3>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : (
            <table style={styles.tableContainer}>
              <thead>
                <tr>
                  <th style={styles.th}>Assessment Name</th>
                  <th style={styles.th}>Date Taken</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Scores</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((row) => (
                    <tr key={row._id}>
                      {/* Note: Using row.assessmentId.title assuming a populated Mongoose ref */}
                      <td style={styles.td}>{row.assessmentName || row.assessmentId?.title}</td>
                      <td style={styles.td}>{new Date(row.createdAt).toLocaleDateString()}</td>
                      <td style={{ ...styles.td, ...styles.statusBadge(row.status) }}>
                        {row.status}
                      </td>
                      {/* Change this in your .map() function */}
<td style={styles.td}>
  {/* If status is Completed or Evaluated, show the score as a percentage */}
  {row.score !== undefined ? `${row.score}` : "Pending"}
</td>
                      
                      <td style={styles.td}>
                        <span 
                          style={styles.viewLink} onClick={() => navigate(`/studentreport/${row._id}`)} // Use navigate instead of window.location                       
                          
                           >
                          View
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, color: "#aaa" }}>
                      No submissions found. Start an assessment to see results!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </main>
      </div>
    </div>
  );
};

export default MySubmissions;