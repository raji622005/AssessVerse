import React, { useState, useEffect } from "react";
import axios from"../../api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";

const LogsAndReports = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // New State for Filtering
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/activity-logs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Filtering Logic: Applies to the data fetched from DB
  const filteredRows = logs.filter(item => {
    const matchesRole = roleFilter === "All" || item.role === roleFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesRole && matchesStatus;
  });

  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", overflowX: "hidden" },
    layoutContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", color: "white", marginLeft: "230px", marginTop: "80px" },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
    filterBtn: { 
        padding: "8px 20px", 
        borderRadius: "20px", 
        border: "none", 
        backgroundColor: "white", 
        color: "#17276B", 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center", 
        gap: "10px", 
        fontFamily: "Acme",
        fontSize: "14px" 
    },
    dropdownMenu: {
        position: "absolute",
        top: "110%",
        left: 0,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        zIndex: 10,
        minWidth: "150px",
        overflow: "hidden"
    },
    dropdownItem: {
        padding: "10px 15px",
        color: "#17276B",
        cursor: "pointer",
        fontSize: "14px",
        borderBottom: "1px solid #eee",
        transition: "background 0.2s"
    },
    table: { width: "95%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" },
    th: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "18px", fontWeight: "normal", backgroundColor: "rgba(255,255,255,0.1)" },
    td: { padding: "12px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "15px" },
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={styles.headerRow}>
            <h2 style={{ fontSize: "32px", display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
              📊 Logs & Reports
            </h2>
          </div>

          {/* FILTER DROPDOWNS SECTION */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
            {/* ROLE DROPDOWN */}
            <div style={{ position: "relative" }}>
              <button style={styles.filterBtn} onClick={() => setIsRoleOpen(!isRoleOpen)}>
                Role: {roleFilter} <span style={{fontSize: "10px"}}>⌵</span>
              </button>
              
              {isRoleOpen && (
                <div style={styles.dropdownMenu}>
                  {["All", "Student", "Instructor"].map(role => (
                    <div 
                        key={role} 
                        style={styles.dropdownItem} 
                        onClick={() => { setRoleFilter(role); setIsRoleOpen(false); }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "white"}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STATUS DROPDOWN */}
            <div style={{ position: "relative" }}>
              <button style={styles.filterBtn} onClick={() => setIsStatusOpen(!isStatusOpen)}>
                Status: {statusFilter} <span style={{fontSize: "10px"}}>⌵</span>
              </button>
              
              {isStatusOpen && (
                <div style={styles.dropdownMenu}>
                  {["All", "Completed", "Success", "Pending", "Failed"].map(status => (
                    <div 
                        key={status} 
                        style={styles.dropdownItem} 
                        onClick={() => { setStatusFilter(status); setIsStatusOpen(false); }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "white"}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", marginTop: "50px" }}>Fetching records from database...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Action</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((log) => (
                    <tr key={log._id}>
                      <td style={styles.td}>{new Date(log.date).toLocaleDateString()}</td>
                      <td style={styles.td}>{log.role}</td>
                      <td style={styles.td}>{log.action}</td>
                      <td style={{ ...styles.td, color: log.status === "Failed" ? "#ff4d4d" : "#00ff88" }}>
                        {log.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "40px", opacity: 0.5 }}>No logs found matching these filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <footer style={{ textAlign: "center", marginTop: "40px", fontSize: "14px", opacity: 0.6 }}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LogsAndReports;