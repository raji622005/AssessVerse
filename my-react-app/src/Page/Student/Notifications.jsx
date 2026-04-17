import React, { useState, useEffect } from "react";
import axios from"../../api/axiosConfig";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Calling the student notification endpoint
      const res = await axios.get("/api/notifications/student", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/notifications/student/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter out the notification after marking it as read
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      alert("Failed to mark as read");
    }
  };

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
      alignItems: "center" 
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
    textSection: { color: "#17276B" },
    title: { margin: "0 0 5px 0", fontSize: "20px", fontWeight: "bold" },
    detail: { margin: 0, fontSize: "16px" },
    time: { margin: "5px 0 0 0", fontSize: "12px", color: "#555" },
    readBtn: { 
      backgroundColor: "#00C853", 
      color: "white", 
      border: "none", 
      padding: "10px 20px", 
      borderRadius: "10px", 
      cursor: "pointer",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebars />
        <main style={styles.mainContent}>
          <div style={styles.container}>
            <h2 style={{ color: "white", marginBottom: "30px", textDecoration: "underline" }}>
              Student Notifications
            </h2>
            
            {loading ? (
              <p style={{ color: "white" }}>Loading...</p>
            ) : notifications.length === 0 ? (
              <p style={{ color: "white" }}>No new notifications.</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} style={styles.notifBox}>
                  <div style={styles.textSection}>
                    <p style={styles.title}>{n.assessmentTitle}</p>
                    <p style={styles.detail}>{n.message}</p>
                    <p style={styles.time}>{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  <button style={styles.readBtn} onClick={() => markAsRead(n._id)}>
                    Dismiss
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;