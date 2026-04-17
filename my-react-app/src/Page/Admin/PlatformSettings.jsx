import React from "react";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { useNavigate } from "react-router-dom";
const PlatformSettings = () => {
  const navigate=useNavigate();
  const styles = {
    // 1. The wrapper must be at least the height of the viewport
    pageWrapper: {
      margin: 0,
      padding: 0,
      width:"85vw",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // Full screen height
      backgroundColor: "#17276B",
      fontFamily: "Acme",
      color: "white",
      overflowX: "hidden",
      marginLeft:"200px",
      marginTop:"100px"
    },
    layoutContainer: {
      display: "flex",
      flex: 1, 
      alignItems: "stretch", 
    },
    mainContent: {
      flex: 1,
      padding: "30px",
      display: "flex",
      flexDirection: "column",
    },
    headerRow: {
      marginBottom: "30px",
    },
    settingsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
    },
    settingCard: {
      backgroundColor: "#0A1230", // Darker blue for cards
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "220px",
      maxWidth:"350px",
      border: "1px solid #1c2b5e",
    },
    cardTitle: {
      margin: "0 0 15px 0",
      color: "#4CAF50", 
      fontSize: "1.4rem",
    },
    cardDescription: {
      fontSize: "1rem",
      color: "#cbd5e0",
      lineHeight: "1.5",
      marginBottom: "20px",
    },
    actionBtn: {
      backgroundColor: "#17276B",
      color: "white",
      border: "1px solid #4CAF50",
      padding: "10px 25px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      alignSelf: "center",
    },
    footer: {
      marginTop: "auto", // Pushes footer to bottom of the content area
      padding: "20px 0",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#cbd5e0",
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Top Header */}
      <HeaderA />

      <div style={styles.layoutContainer}>
        {/* Sidebar now stretches to the bottom because of flex: 1 above */}
        <SidebarA />

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          <div style={styles.headerRow}>
            <h2 style={{ fontSize: "2rem" }}>Platform Settings</h2>
          </div>

          <div style={styles.settingsGrid}>
            

            <div style={styles.settingCard}>
              <h3 style={styles.cardTitle}>User Role</h3>
              <p style={styles.cardDescription}>
                View Configure user roles, permissions, and access levels.
              </p>
              <button style={styles.actionBtn} onClick={()=>{navigate('/Role')}}>View</button>
            </div>

            <div style={styles.settingCard}>
              <h3 style={styles.cardTitle}>Branding</h3>
              <p style={styles.cardDescription}>
                 platform logo and the platform name.
              </p>
              <button style={styles.actionBtn} onClick={()=>{navigate('/branding')}}>View</button>
            </div>
          </div>

          <footer style={styles.footer}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;