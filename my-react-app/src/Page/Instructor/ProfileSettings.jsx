import React, { useState } from "react";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";

const InstructorProfile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'settings'
  const [showOverlay, setShowOverlay] = useState(false);
  
  // --- Editable State ---
  const [formData, setFormData] = useState({
    name: "Raji",
    email: "raji@gmail.com",
    mobile: "9123456780",
    role: "Instructor",
    age: "20",
    gender: "Female",
    dob: "06.02.2005",
    qualification: "B.E.CSE",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => setShowOverlay(true);

  const styles = {
    pageWrapper: { 
      width: "100vw", 
      minHeight: "100vh", 
      backgroundColor: "#0A1230", 
      display: "flex", 
      flexDirection: "column",
      fontFamily: "'Inter', sans-serif" 
    },
    layoutBody: { display: "flex", flex: 1 },
    mainContent: { 
      flex: 1, 
      backgroundColor: "#17276B", 
      padding: "40px", 
      display: "flex", 
      flexDirection: "column" 
    },
    card: {
      backgroundColor: "#D9D9D9", 
      borderRadius: "15px",
      padding: "40px",
      maxWidth: "1000px",
      margin: "0 auto",
      width: "100%",
      position: "relative",
      minHeight: "500px"
    },
    tabHeader: {
      display: "flex",
      gap: "50px",
      borderBottom: "2px solid #999",
      marginBottom: "30px",
      paddingBottom: "10px"
    },
    tabLink: (active) => ({
      fontSize: "28px",
      fontWeight: "bold",
      cursor: "pointer",
      color: active ? "#17276B" : "#444",
      textDecoration: active ? "underline" : "none",
      transition: "0.3s"
    }),
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      fontSize: "20px",
      color: "#0A1230"
    },
    inputInline: {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid #999",
      fontSize: "20px",
      color: "#0A1230",
      textAlign: "right",
      width: "50%",
      outline: "none",
      fontFamily: "inherit"
    },
    passwordInput: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#B0B0B0", 
      border: "none",
      borderRadius: "8px",
      marginTop: "8px",
      outline: "none"
    },
    saveBtn: {
      backgroundColor: "#10B981",
      color: "white",
      padding: "10px 25px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    undoBtn: {
      backgroundColor: "#EF4444",
      color: "white",
      padding: "10px 25px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "15px"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Headeri />
      <div style={styles.layoutBody}>
        <Sidebari />
        
        <main style={styles.mainContent}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px", color: "white" }}>
             <span style={{ fontSize: "30px" }}>👤</span>
             <h2 style={{ fontSize: "32px", margin: 0 }}>Profile</h2>
          </div>

          <div style={styles.card}>
            <button style={{ position: "absolute", right: "30px", top: "30px", backgroundColor: "#EF4444", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer" }}>Log out</button>

            <div style={styles.tabHeader}>
              <span style={styles.tabLink(activeTab === "profile")} onClick={() => setActiveTab("profile")}>Profile</span>
              <span style={styles.tabLink(activeTab === "settings")} onClick={() => setActiveTab("settings")}>Profile Settings</span>
            </div>

            {activeTab === "profile" ? (
              /* --- PROFILE VIEW --- */
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "40px" }}>
                  <div style={{ width: "120px", height: "120px", backgroundColor: "#B0B0B0", borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>👤</div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "32px" }}>{formData.name} 🖊️</h2>
                    <p style={{ margin: 0, fontSize: "20px", color: "#444" }}>{formData.role} user 🖊️</p>
                  </div>
                </div>

                <h3 style={{ borderBottom: "1px solid #999", paddingBottom: "10px", color: "#17276B" }}>Change Password</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px", marginTop: "20px" }}>
                  <div>
                    <label style={{ fontWeight: "bold" }}>Old Password</label>
                    <input type="password" name="oldPassword" placeholder="********" style={styles.passwordInput} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontWeight: "bold" }}>Email</label>
                    <input type="text" name="email" value={formData.email} readOnly style={{ ...styles.passwordInput, opacity: 0.7 }} />
                  </div>
                  <div>
                    <label style={{ fontWeight: "bold" }}>New Password</label>
                    <input type="password" name="newPassword" placeholder="********" style={styles.passwordInput} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontWeight: "bold" }}>Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="********" style={styles.passwordInput} onChange={handleChange} />
                  </div>
                </div>
              </div>
            ) : (
              /* --- PROFILE SETTINGS (EDITABLE CONTENT) --- */
              <div>
                <h3 style={{ color: "#7E22CE", fontSize: "24px", marginBottom: "20px" }}>Personal Information</h3>
                <div style={{ maxWidth: "700px" }}>
                  {[
                    { label: "Name", key: "name" },
                    { label: "Email", key: "email" },
                    { label: "Mobile Number", key: "mobile" },
                    { label: "Role", key: "role" },
                    { label: "Age", key: "age" },
                    { label: "Gender", key: "gender" },
                    { label: "Date of Birth", key: "dob" },
                    { label: "Educational Qualification", key: "qualification" }
                  ].map((item) => (
                    <div key={item.key} style={styles.infoRow}>
                      <span style={{ fontWeight: "600" }}>{item.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "60%", justifyContent: "flex-end" }}>
                        <input 
                          style={styles.inputInline} 
                          name={item.key} 
                          value={formData[item.key]} 
                          onChange={handleChange}
                        />
                        <span>🖊️</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
              <button style={styles.undoBtn} onClick={() => window.location.reload()}>Undo</button>
              <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#CBD5E0", marginTop: "auto", fontSize: "14px" }}>
            © copyrights 2026 AssessVerse
          </p>
        </main>
      </div>

      {/* Success Modal */}
      {showOverlay && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#0A1230", padding: "50px", borderRadius: "12px", textAlign: "center", color: "white" }}>
            <p style={{ fontSize: "22px", marginBottom: "30px" }}>Your changes have been saved successfully.</p>
            <button onClick={() => setShowOverlay(false)} style={{ backgroundColor: "#333", color: "white", padding: "10px 30px", border: "none", borderRadius: "20px", cursor: "pointer", float: "right" }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorProfile;