import React, { useState, useEffect } from "react";
import axios from "src/api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Backend Integration ---
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDeleteAssessment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/notifications/assessment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Assessment deletion failed", err);
      alert("Only Admins can delete assessments.");
    }
  };

  // --- Updated Styles to match Instructor UI ---
  const styles = {
    pageWrapper: { 
      width: "90vw", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      backgroundColor: "#0A1230", 
      marginLeft: "130px", 
      marginTop: "50px", 
      fontFamily: "'Acme', sans-serif" 
    },
    mainContent: { 
      flex: 1, 
      backgroundColor: "#17276B", 
      padding: "90px 40px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      overflowY: "auto"
    },
    container: { width: "100%", maxWidth: "800px" },
    notifBox: { 
      backgroundColor: "#D9D9D9", 
      borderRadius: "15px", 
      padding: "20px", 
      marginBottom: "20px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    },
    dot: (type) => ({ 
      width: "12px", 
      height: "12px", 
      borderRadius: "50%", 
      display: "inline-block",
      backgroundColor: type === "ASSESSMENT_SUBMITTED" ? "red" : type === "REGISTRATION" ? "yellow" : "blue", 
      marginRight: "10px"
    }),
    textSection: { color: "#17276B", flex: 1 },
    title: { margin: "0 0 5px 0", fontSize: "19px", fontWeight: "bold" },
    detail: { margin: "0 0 5px 0", fontSize: "16px", color: "#6A1B9A" },
    time: { margin: 0, fontSize: "13px", color: "#555" },
    buttonGroup: { display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" },
    readBtn: { 
      backgroundColor: "#00C853", 
      color: "white", 
      border: "none", 
      padding: "10px 20px", 
      borderRadius: "10px", 
      cursor: "pointer",
      fontWeight: "bold"
    },
    delBtn: { 
      backgroundColor: "#B71C1C", 
      color: "white", 
      border: "none", 
      padding: "8px 15px", 
      borderRadius: "10px", 
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "12px"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <HeaderA />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarA />
        <main style={styles.mainContent}>
          <div style={styles.container}>
            <h2 style={{ color: "white", marginBottom: "30px", textDecoration: "underline", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>🔔</span> Recent Notifications
            </h2>

            {loading ? (
              <p style={{ color: "white" }}>Loading...</p>
            ) : notifications.length === 0 ? (
              <p style={{ color: "white" }}>All caught up! No new notifications.</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} style={styles.notifBox}>
                  <div style={styles.textSection}>
                    <p style={styles.title}>
                      <span style={styles.dot(n.type)}></span>
                      {n.message}
                    </p>
                    <p style={styles.detail}><strong>{n.details}</strong></p>
                    <p style={styles.time}>{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  
                  <div style={styles.buttonGroup}>
                    <button style={styles.readBtn} onClick={() => handleMarkAsRead(n._id)}>
                      Mark as Read
                    </button>
                    {n.type === "ASSESSMENT_PUBLISHED" && (
                      <button style={styles.delBtn} onClick={() => handleDeleteAssessment(n._id)}>
                        Delete Assessment
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;