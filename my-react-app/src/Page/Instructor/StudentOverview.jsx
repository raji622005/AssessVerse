import React, { useState, useRef, useEffect } from "react";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";
import axios from "src/api/axiosConfig";

const StudentOverview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [perfFilter, setPerfFilter] = useState("Performance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
  try {
    setLoading(true);
    
    // 1. Get the token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
       console.error("No token found. Redirecting to login...");
       setLoading(false);
       return;
    }

    // 2. Add the headers to your requests
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const [userRes, subRes] = await Promise.all([
      axios.get("/api/users", config),
      axios.get("/api/submissions", config)
    ]);

    console.log("✅ Data fetched successfully");
        console.log("Raw Users:", userRes.data);
        console.log("Raw Submissions:", subRes.data);

        // 2. Filter for students. 
        // Note: .toLowerCase() handles if your DB has "Student" or "student"
        const studentUsers = userRes.data.filter(u => 
          u.role && u.role.toLowerCase() === "student"
        );

        // 3. Process metrics by linking Submissions to Users
        const processedData = studentUsers.map(student => {
          // Normalize student ID to string
          const studentIdStr = student._id.toString();

          // Find all submissions belonging to THIS student
          const studentSubmissions = subRes.data.filter(s => {
            const subUserId = s.userId?._id || s.userId; 
            return subUserId && subUserId.toString() === studentIdStr;
          });

          const count = studentSubmissions.length;
          
          // Only count scores that are actually numbers
          const totalScore = studentSubmissions.reduce((sum, s) => {
            const val = parseFloat(s.score);
            return sum + (isNaN(val) ? 0 : val);
          }, 0);

          const avg = count > 0 ? Math.round(totalScore / count) : 0;

          // Performance Threshold Logic
          let performance = "N/A";
          if (count > 0) {
            if (avg >= 85) performance = "Excellent";
            else if (avg >= 70) performance = "Good";
            else performance = "Average";
          }

          return {
            id: studentIdStr,
            name: student.name || "Unnamed Student",
            assessments: count,
            score: avg,
            performance: performance
          };
        });

        setStudents(processedData);
      } catch (error) {
        console.error("Error loading student overview:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FILTER LOGIC ---
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPerf = perfFilter === "Performance" || student.performance === perfFilter;
    return matchesSearch && matchesPerf;
  });

  const handleSelectFilter = (value) => {
    setPerfFilter(value);
    setIsDropdownOpen(false);
  };

  // --- STYLES ---
  const styles = {
    pageWrapper: { width: "90vw", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'Acme', sans-serif", backgroundColor: "#0A1230", marginLeft:"130px", marginTop:"50px" },
    layoutBody: { display: "flex", flex: 1, overflow: "hidden" },
    mainContent: { flex: 1, backgroundColor: "#17276B", padding: "90px 40px", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" },
    contentWrapper: { width: "100%", maxWidth: "1100px", display: "flex", flexDirection: "column" },
    titleRow: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", color: "white", width: "100%" },
    controlsRow: { display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center", width: "100%" },
    searchBar: { backgroundColor: "white", borderRadius: "20px", padding: "5px 15px", display: "flex", alignItems: "center", width: "220px" },
    filterWrapper: { position: "relative" },
    filterDropdown: { backgroundColor: "white", borderRadius: "20px", padding: "5px 15px", color: "#333", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", minWidth: "150px", justifyContent: "space-between" },
    dropdownBox: { position: "absolute", top: "120%", left: "0", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 8px 16px rgba(0,0,0,0.3)", width: "100%", zIndex: 10, display: isDropdownOpen ? "block" : "none" },
    dropdownItem: { padding: "8px 15px", color: "black", fontSize: "13px", cursor: "pointer", borderBottom: "1px solid #eee" },
    tableContainer: { border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "8px", width: "100%", overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.02)" },
    table: { width: "100%", borderCollapse: "collapse", color: "white", textAlign: "center", tableLayout: "fixed" },
    th: { border: "1px solid rgba(255, 255, 255, 0.2)", padding: "15px 10px", fontSize: "16px", fontWeight: "normal", backgroundColor: "rgba(255,255,255,0.1)", whiteSpace: "nowrap" },
    td: { border: "1px solid rgba(255, 255, 255, 0.1)", padding: "12px", fontSize: "15px" },
    viewAction: { color: "#48BB78", fontWeight: "bold", cursor: "pointer", fontSize: "13px" },
    footer: { textAlign: "center", padding: "20px", color: "#CBD5E0", fontSize: "12px", marginTop: "auto", width: "100%" },
  };

  if (loading) return (
    <div style={styles.pageWrapper}>
      <div style={{...styles.mainContent, color: "white", fontSize: "20px"}}>
        Loading Student Statistics...
      </div>
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <div style={styles.mainContent}>
          <div style={styles.contentWrapper}>
            <div style={styles.titleRow}>
              <span style={{ fontSize: "24px" }}>👥</span>
              <h2 style={{ margin: 0, textDecoration: "underline", fontSize: "26px" }}>Student Overview</h2>
            </div>

            <div style={styles.controlsRow}>
              <div style={styles.searchBar}>
                <input 
                  type="text" 
                  placeholder="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: "none", outline: "none", width: "100%", fontSize: "14px" }} 
                />
                <span style={{ color: "#666" }}>🔍</span>
              </div>
              
              <div style={styles.filterWrapper} ref={dropdownRef}>
                <div 
                  style={styles.filterDropdown} 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Filter : {perfFilter}  <span>⌵</span>
                </div>
                <div style={styles.dropdownBox}>
                  {["Performance", "Excellent", "Good", "Average", "N/A"].map((perf) => (
                    <div 
                      key={perf}
                      style={styles.dropdownItem} 
                      onClick={() => handleSelectFilter(perf)}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                    >
                      {perf === "Performance" ? "All" : perf}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{...styles.th, width: "20%"}}>Name</th>
                    <th style={{...styles.th, width: "25%"}}>Assessments Taken</th>
                    <th style={{...styles.th, width: "20%"}}>Average Score</th>
                    <th style={{...styles.th, width: "20%"}}>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td style={styles.td}>{student.name}</td>
                        <td style={styles.td}>{student.assessments}</td>
                        <td style={styles.td}>{student.score}%</td>
                        <td style={styles.td}>{student.performance}</td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{...styles.td, padding: "40px"}}>No students found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;