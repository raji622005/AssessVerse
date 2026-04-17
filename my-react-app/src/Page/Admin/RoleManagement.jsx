import React, { useState, useEffect } from "react";
import axios from "src/api/axiosConfig";
import { useNavigate } from "react-router-dom"; // Use navigate for cleaner routing
import HeaderA from "../../Component/Admin/HeaderA"; 
import SidebarA from "../../Component/Admin/SidebarA";

const RoleManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Initial state reflects the UI design from your platform
  const [permissions, setPermissions] = useState({
    Student: "View, Attempt Tests",
    Instructor: "Create, Evaluate Tests",
    Admin: "Full Access"
  });

  // Fetch current roles from database - strictly read-only
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/roles", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.permissions) {
          setPermissions(res.data.permissions);
        }
      } catch (err) {
        console.error("Error fetching roles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleData();
  }, []);

  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", overflowX: "hidden" },
    layoutContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", color: "white", marginLeft: "230px", marginTop: "80px" },
    roleContainer: { 
        backgroundColor: "rgba(255,255,255,0.05)", 
        borderRadius: "15px", 
        padding: "40px", 
        maxWidth: "900px", 
        margin: "0 auto", 
        marginTop: "30px", 
        textAlign: "center", 
        border: "1px solid rgba(255,255,255,0.1)" 
    },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
    title: { fontSize: "32px", display: "flex", alignItems: "center", gap: "10px", margin: 0 },
    table: { width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" },
    th: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "28px", color: "#00C853", fontWeight: "normal" },
    td: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "20px", color: "#CBD5E0" },
    backBtn: { 
        backgroundColor: "white", 
        color: "#17276B", 
        padding: "10px 30px", 
        borderRadius: "25px", 
        border: "none", 
        cursor: "pointer", 
        fontWeight: "bold", 
        fontSize: "16px",
        marginTop: "30px",
        fontFamily: "Acme",
        float: "right",
        transition: "transform 0.2s"
    },
    backArrow: { fontSize: "24px", cursor: "pointer", color: "white", background: "none", border: "none", marginRight: "10px" }
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <main style={styles.mainContent}>
          <div style={styles.headerRow}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button style={styles.backArrow} onClick={() => navigate("/platform-settings")}>↩️</button>
              <h2 style={styles.title}>Role Permissions</h2>
            </div>
          </div>

          <div style={styles.roleContainer}>
            {loading ? (
                <p>Loading permissions data...</p>
            ) : (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Role</th>
                      <th style={styles.th}>Access Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissions).map((role, index) => (
                      <tr key={index}>
                        <td style={styles.td}><strong>{role}</strong></td>
                        <td style={styles.td}>
                          {permissions[role]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
          </div>
          
          {/* Replaced Save Changes with Back to Settings */}
          <button 
            style={styles.backBtn} 
            onClick={() => navigate("/platformsettings")}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Back to Settings
          </button>

          <footer style={{ textAlign: "center", marginTop: "120px", fontSize: "14px", opacity: 0.6, width: "100%" }}>
            © copyrights 2026 AssessVerse
          </footer>
        </main>
      </div>
    </div>
  );
};

export default RoleManagement;