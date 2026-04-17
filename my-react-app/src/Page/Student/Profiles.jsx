import React, { useState, useEffect } from "react";
import axios from"../../api/axiosConfig";
import Headers from "../../Component/Student/Headers.jsx";
import Sidebars from "../../Component/Student/Sidebars.jsx";

const StudentProfile = () => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState("profile");
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "Student",
    age: "",
    gender: "",
    dob: "",
    qualification: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // --- 1. Fetch Data on Component Mount ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        // Updated URL to match your backend standard
        const response = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData((prev) => ({
          ...prev,
          ...response.data, 
          oldPassword: "", 
          newPassword: "",
          confirmPassword: ""
        }));
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load profile data. Check if server is running on port 5000.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- 2. Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match!");
        return;
      }

      // FIXED: URL changed to /profile to match your Backend router.put("/profile")
      await axios.put("/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowOverlay(true);
      setFormData(prev => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));
    } catch (err) {
      console.error("Update Error Details:", err.response?.data);
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  // --- 3. Styles (Kept as per your design) ---
  const styles = {
    pageWrapper: { width: "100vw", minHeight: "100vh", backgroundColor: "#0A1230", display: "flex", flexDirection: "column", fontFamily: "'Acme', sans-serif" },
    layoutBody: { display: "flex", flex: 1 },
    mainContent: { flex: 1, backgroundColor: "#17276B", padding: "70px", display: "flex", flexDirection: "column",marginLeft:"150px",marginTop:"70px" },
    headerRow: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", color: "white" },
    card: { backgroundColor: "#D9D9D9", borderRadius: "20px", padding: "40px", maxWidth: "1000px", margin: "0 auto", width: "100%", position: "relative", minHeight: "550px", color: "#17276B" },
    tabHeader: { display: "flex", gap: "50px", borderBottom: "1px solid #999", marginBottom: "30px", paddingBottom: "10px" },
    tabLink: (active) => ({ fontSize: "28px", fontWeight: "bold", cursor: "pointer", color: active ? "#17276B" : "#444", textDecoration: active ? "underline" : "none" }),
    logoutBtn: { position: "absolute", right: "30px", top: "30px", backgroundColor: "#EF4444", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
    userHeader: { display: "flex", alignItems: "center", gap: "25px", paddingBottom: "25px", borderBottom: "1px solid #999", marginBottom: "30px" },
    avatar: { width: "110px", height: "110px", backgroundColor: "#B0B0B0", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", color: "#666", border: "1px solid #999" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px 60px" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
    input: { width: "100%", padding: "12px 15px", backgroundColor: "#B0B0B0", border: "none", borderRadius: "15px", fontSize: "14px", outline: "none" },
    settingsList: { display: "flex", flexDirection: "column", gap: "15px" },
    settingsRow: { display: "grid", gridTemplateColumns: "350px 1fr", fontSize: "22px", alignItems: "center", padding: "5px 0" },
    inlineInput: { border: "none", background: "transparent", fontSize: "22px", color: "#17276B", outline: "none", fontFamily: "inherit", width: "100%", padding: "2px 0" },
    actionRow: { display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "40px" },
    undoBtn: { backgroundColor: "#EF4444", color: "white", border: "none", padding: "10px 30px", borderRadius: "8px", cursor: "pointer" },
    saveBtn: { backgroundColor: "#00C853", color: "white", border: "none", padding: "10px 30px", borderRadius: "8px", cursor: "pointer" },
    footer: { textAlign: "center", padding: "20px", color: "#CBD5E0", fontSize: "12px", marginTop: "auto" }
  };

  if (loading) return <div style={{ color: "white", textAlign: "center", padding: "100px", fontSize: "24px", backgroundColor: "#0A1230", height: "100vh" }}>Loading Student Profile...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", padding: "100px", backgroundColor: "#0A1230", height: "100vh" }}>{error}</div>;

  return (
    <div style={styles.pageWrapper}>
      <Headers />
      <div style={styles.layoutBody}>
        <Sidebars />
        <main style={styles.mainContent}>
          <div style={styles.headerRow}>
            <span style={{ fontSize: "28px" }}>👤</span>
            <h2 style={{ margin: 0, fontSize: "28px" }}>Profile</h2>
          </div>

          <div style={styles.card}>
            <button style={styles.logoutBtn} onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>Log out</button>

            <div style={styles.tabHeader}>
              <span style={styles.tabLink(activeTab === "profile")} onClick={() => setActiveTab("profile")}>Profile</span>
              <span style={styles.tabLink(activeTab === "settings")} onClick={() => setActiveTab("settings")}>Profile Settings</span>
            </div>

            {activeTab === "profile" ? (
              <div>
                <div style={styles.userHeader}>
                  <div style={styles.avatar}>👤</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h2 style={{ margin: 0, fontSize: "32px" }}>{formData.name} <span style={{ fontSize: "24px" }}>🏅</span></h2>
                    <h3 style={{ margin: 0, fontWeight: "normal", fontSize: "24px" }}>{formData.role} user</h3>
                  </div>
                </div>

                <h3 style={{ marginBottom: "25px", fontSize: "24px" }}>Security & Email</h3>
                <div style={styles.formGrid}>
                  <div style={styles.inputGroup}>
                    <label style={{ fontWeight: "bold" }}>Email (Registered)</label>
                    <input type="text" value={formData.email} readOnly style={{ ...styles.input, opacity: 0.7, cursor: "not-allowed" }} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={{ fontWeight: "bold" }}>Old Password</label>
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} style={styles.input} placeholder="********" />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={{ fontWeight: "bold" }}>New Password</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} style={styles.input} placeholder="********" />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={{ fontWeight: "bold" }}>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={styles.input} placeholder="********" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#7B2CBF", fontSize: "26px", marginBottom: "25px", fontWeight: "bold" }}>Personal Information</h3>
                <div style={styles.settingsList}>
                  {[
                    { label: "Full Name", key: "name" },
                    { label: "Mobile number", key: "mobile" },
                    { label: "Age", key: "age" },
                    { label: "Gender", key: "gender" },
                    { label: "Date of Birth", key: "dob" },
                    { label: "Education Qualification", key: "qualification" }
                  ].map((item) => (
                    <div key={item.key} style={styles.settingsRow}>
                      <span style={{ fontWeight: "bold" }}>{item.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #999" }}>
                        <input
                          type="text"
                          name={item.key}
                          value={formData[item.key] || ""}
                          onChange={handleChange}
                          style={styles.inlineInput}
                        />
                        <span style={{ fontSize: "16px" }}>🖊️</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.actionRow}>
              <button style={styles.undoBtn} onClick={() => window.location.reload()}>Undo</button>
              <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
            </div>
          </div>

          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </main>
      </div>

      {showOverlay && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#0A1230", padding: "50px", borderRadius: "12px", textAlign: "center", color: "white", position: "relative", maxWidth: "450px" }}>
            <p style={{ fontSize: "22px", marginBottom: "35px" }}>Your changes have been saved successfully.</p>
            <button onClick={() => setShowOverlay(false)} style={{ backgroundColor: "#00C853", color: "white", padding: "8px 30px", border: "none", borderRadius: "20px", cursor: "pointer" }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;