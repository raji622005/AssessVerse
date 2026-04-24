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
          // FIXED: Use the baseURL from your axios configuration instead of hardcoded localhost
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

  // ... (rest of your styles stay the same)

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
                  {/* Added onError to show a placeholder if the image still fails to load */}
                  <img 
                    src={branding.logoUrl} 
                    alt="Institute Logo" 
                    style={styles.logoImage} 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/180?text=Logo+Not+Found"; }}
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