import React, { useState, useRef, useEffect } from "react";
import axios from "src/api/axiosConfig";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";
import { useNavigate } from "react-router-dom";

const ManageAssessment = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Status"); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Get your token

        // 1. Hit the correct endpoint (get-assessments, NOT stats)
        // 2. Pass the Authorization header
        const res = await axios.get("/api/submissions/get-assessments", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Ensure we are setting an array
        setAssessments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this assessment?")) {
    try {
      // 1. Retrieve the token from storage
      const token = localStorage.getItem("token");

      // 2. Prepare the config object with the Bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 3. Pass the config as the second argument for DELETE requests
      await axios.delete(
        `/api/data/delete-assessment/${id}`,
        config
      );

      // 4. Update local state to remove the item from the UI
      setAssessments(assessments.filter((item) => (item._id || item.id) !== id));
      
      alert("Assessment deleted successfully");
    } catch (err) {
      // Enhanced error logging to check if it's still an auth issue
      console.error("Delete Error:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        alert("Failed to delete assessment");
      }
    }
  }
};

  const handleSelectFilter = (value) => {
    setStatusFilter(value);
    setIsFilterOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = assessments.filter((item) => {
    const name = item.title || item.name || item.assessmentName || "Untitled"; 
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const dbStatus = item.status ? item.status.trim() : "Unset"; 
    
    const matchesStatus = 
      statusFilter === "Status" || 
      dbStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const styles = {
    pageWrapper: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "'Acme', sans-serif", backgroundColor: "#0A1230", display: "flex", flexDirection: "column" },
    layoutBody: { display: "flex", flex: 1 },
    mainContent: { flex: 1, backgroundColor: "#17276B", padding: "40px 40px 40px 100px", marginLeft: "180px", display: "flex", flexDirection: "column", minHeight: "100vh", boxSizing: "border-box", marginTop: "70px" },
    titleRow: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", color: "white" },
    controlsRow: { display: "flex", gap: "20px", marginBottom: "30px", alignItems: "center", position: "relative", zIndex: 100 }, 
    searchBar: { backgroundColor: "white", borderRadius: "20px", padding: "5px 15px", display: "flex", alignItems: "center", width: "220px" },
    filterWrapper: { position: "relative", zIndex: 110 }, 
    filterDropdown: { backgroundColor: "white", borderRadius: "20px", padding: "5px 15px", color: "#333", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", minWidth: "130px", justifyContent: "space-between" },
    dropdownBox: { position: "absolute", top: "110%", left: "0", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 8px 16px rgba(0,0,0,0.3)", width: "100%", zIndex: 200, overflow: "hidden", display: isFilterOpen ? "block" : "none" },
    dropdownItem: { padding: "10px 15px", color: "black", fontSize: "14px", cursor: "pointer", borderBottom: "1px solid #eee" },
    tableContainer: { border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "4px", backgroundColor: "#0A1230", position: "relative", zIndex: 1 },
    table: { width: "100%", borderCollapse: "collapse", color: "white", textAlign: "center" },
    th: { border: "1px solid rgba(255, 255, 255, 0.3)", padding: "15px", fontSize: "20px", backgroundColor: "rgba(255,255,255,0.05)" },
    td: { border: "1px solid rgba(255, 255, 255, 0.3)", padding: "15px", fontSize: "18px" },
    actionCell: { display: "flex", justifyContent: "center", alignItems: "stretch", height: "100%", padding: 0 },
    actionBox: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", fontSize: "14px", fontWeight: "bold", cursor: "pointer", borderRight: "1px solid rgba(255, 255, 255, 0.3)" },
    footer: { textAlign: "center", padding: "20px", color: "#CBD5E0", fontSize: "12px", marginTop: "auto" },
  };

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        <div style={styles.mainContent}>
          <div style={styles.titleRow}>
            <span style={{ fontSize: "28px" }}>⚙</span>
            <h2 style={{ margin: 0, textDecoration: "underline", fontSize: "28px" }}>Manage Assessment</h2>
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
              <div style={styles.filterDropdown} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                Filter : {statusFilter === "Status" ? "All" : statusFilter} <span>⌵</span>
              </div>
              <div style={styles.dropdownBox}>
                {["Status", "Published", "Draft"].map((opt) => (
                  <div key={opt} style={styles.dropdownItem} onClick={() => handleSelectFilter(opt)}>
                    {opt === "Status" ? "All" : opt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>S.No</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={styles.td}>Loading assessments...</td></tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const currentStatus = item.status || "No Status";
                    let statusColor = "white"; 
                    if (currentStatus === "Draft") statusColor = "#ECC94B"; 
                    if (currentStatus === "Published") statusColor = "#48BB78"; 

                    return (
                      <tr key={item._id || item.id}>
                        <td style={styles.td}>{index + 1}</td>
                        <td style={styles.td}>{item.title || item.name || "Untitled"}</td>
                        <td style={{ ...styles.td, color: statusColor, fontWeight: "bold" }}>{currentStatus}</td>
                        <td style={{ ...styles.td, padding: 0 }}>
                          <div style={styles.actionCell}>
                            {/* CONDITION: Only show EDIT if status is NOT Published (i.e., Draft) */}
                            {currentStatus === "Published" && (
                              <div 
                                onClick={() => navigate(`/edit-assessment/${item._id || item.id}`)} 
                                style={{ ...styles.actionBox, color: "#48BB78" }}
                              >
                                EDIT
                              </div>
                            )}

                            <div 
                              style={{ ...styles.actionBox, color: "#E53E3E" }} 
                              onClick={() => handleDelete(item._id || item.id)}
                            >
                              DELETE
                            </div>

                            <div 
                              onClick={() => navigate(`/view-assessment/${item._id || item.id}`)} 
                              style={{ ...styles.actionBox, color: "white", borderRight: "none" }}
                            >
                              VIEW
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="5" style={styles.td}>No assessments found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </div>
      </div>
    </div>
  );
};

const thStyle = { border: "1px solid rgba(255, 255, 255, 0.3)", padding: "15px", fontSize: "20px", backgroundColor: "rgba(255,255,255,0.05)" };

export default ManageAssessment;