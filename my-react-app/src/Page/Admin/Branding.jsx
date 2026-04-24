import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA"; 
import SidebarA from "../../Component/Admin/SidebarA";

const Branding = () => {
  const [branding, setBranding] = useState({ name: "", logoUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/branding", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data) {
          // Use the dynamic baseURL from axios to support Render deployment
          const backendBaseUrl = axios.defaults.baseURL || "https://assessverse.onrender.com";
          setBranding({
            name: res.data.name,
            logoUrl: `${backendBaseUrl}${res.data.logoUrl}`
          });
        }
      } catch (err) {
        console.error("Error fetching branding:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandingData();
  }, []);

  // FIXED: styles MUST be defined before the return statement
  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", overflowX: "hidden" },
    layoutContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", color: "white", marginLeft: "230px", marginTop: "80px" },
    brandingContainer: { 
      backgroundColor: "rgba(255,255,255,0.1)", 
      borderRadius: "10px", 
      padding: "40px", 
      maxWidth: "600px", 
      margin: "30px auto", 
      textAlign: "center", 
      border: "1px solid rgba(255,255,255,0.2)" 
    },
    title: { fontSize: "32px", marginBottom: "40px", fontWeight: "bold" },
    subtitle: { fontSize: "18px", color: "rgba(255,255,255,0.6)", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" },
    displayValue: { fontSize: "28px", color: "white", marginBottom: "40px", fontWeight: "500" },
    logoImage: { 
      width: "180px", 
      height: "180px", 
      objectFit: "contain", 
      borderRadius: "50%", 
      backgroundColor: "white", 
      padding: "15px", 
      border: "4px solid rgba(255,255,255,0.2)",
      marginTop: "10px"
    },
    footer: { textAlign: "center", marginTop: "100px", fontSize: "14px", opacity: 0.8 }
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <h2 style={styles.title}>Branding Details</h2>

          <div style={styles.brandingContainer}>
            {loading ? (
              <p>Loading branding details...</p>
            ) : (
              <>
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={styles.subtitle}>Institute Name</h3>
                  <div style={styles.displayValue}>{branding.name || "Not Set"}</div>
                </div>

                <div>
                  <h3 style={styles.subtitle}>Institute Logo</h3>
                  <img 
                    src={branding.logoUrl} 
                    alt="Institute Logo" 
                    style={styles.logoImage} 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/180?text=No+Logo"; }}
                  />
                </div>
              </>
            )}
          </div>

          <footer style={styles.footer}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Branding;