import React, { useState, useEffect } from "react";
import axios from"../../api/axiosConfig";
import { FaBell } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/admin-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdminData(res.data);
      } catch (err) {
        console.error("Error fetching admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const styles = {
    body: { margin: 0, width: "99vw", height: "100vh", fontFamily: "Acme" },
    dashboardContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", backgroundColor: "#17276B",marginLeft:"210px",marginTop:"100px" },
    header: { display: "flex", color: "white", justifyContent: "space-between", alignItems: "center" },
    cardsContainer: { display: "flex", backgroundColor: "#0A1230", gap: "20px", marginTop: "10px", flexWrap: "wrap" },
    card: { flex: "1", minWidth: "250px", color: "white", padding: "20px", borderRadius: "12px", textAlign: "center" },
    bigNumber: { fontSize: "28px", fontWeight: "bold" },
    announcements: { padding: "20px", borderRadius: "10px" },
    b1: { color: "black", backgroundColor: "lightgrey", width: "100%", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", paddingLeft: "15px", marginBottom: "10px" },
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.dashboardContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h2>Welcome to Admin Dashboard!</h2>
          </div>

          <div style={styles.cardsContainer}>
            <div style={styles.card}>
              <h3>Active Students</h3>
              <p style={styles.bigNumber}>{loading ? "..." : adminData?.students?.total || 0}</p>
              <p>Active: {adminData?.students?.active || 0}</p>
            </div>

            <div style={styles.card}>
              <h3>Active Instructors</h3>
              <p style={styles.bigNumber}>{loading ? "..." : adminData?.instructors?.total || 0}</p>
              <p>Active: {adminData?.instructors?.active || 0}</p>
            </div>

            <div style={styles.card}>
              <h3>Assessments</h3>
              <p style={styles.bigNumber}>{loading ? "..." : adminData?.assessments?.total || 0}</p>
              <p>Ready: {adminData?.assessments?.ready || 0}</p>
              <p>Pending: {adminData?.assessments?.pending || 0}</p>
            </div>
          </div>

          <div style={styles.announcements}>
            <h3 style={{ color: "white" }}>Announcements & Alerts</h3>
            <ul>
              <li style={styles.b1}><FaBell size={20} color={"yellow"} style={{ marginRight: "20px" }} /> Platform maintenance on Sunday</li>
              <li style={styles.b1}><FaFlag size={20} color={"red"} style={{ marginRight: "20px" }} /> Unusual login activity detected</li>
            </ul>
          </div>

          <footer style={{ color: "white", textAlign: "center", marginTop: "auto" }}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;