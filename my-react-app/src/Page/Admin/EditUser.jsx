import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa"; // Using an Edit icon instead of Add

const EditUser = () => {
  const navigate = useNavigate();

  // Initializing with existing data (Aashi's details)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Student",
    status: "Active",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("User details updated successfully!");
    navigate("/admin/users");
  };

  const styles = {
    body: {
      margin: 0,
      width: "100vw",
      minHeight: "100vh",
      fontFamily: "Acme",
      backgroundColor: "#17276B",
      display: "flex",
      flexDirection: "column",
    },
    layoutContainer: { display: "flex", flex: 1 },
    mainContent: {
      flex: 1,
      padding: "20px",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    topNav: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      alignSelf: "flex-start",
      fontSize: "24px",
      marginBottom: "20px",
    },
    formCard: {
      backgroundColor: "#D9D9D9",
      padding: "40px",
      borderRadius: "20px",
      width: "100%",
      maxWidth: "700px",
      color: "#17276B",
    },
    formTitle: {
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "30px",
      textDecoration: "underline",
    },
    row: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    label: {
      flex: "0 0 200px",
      fontSize: "20px",
      fontWeight: "bold",
      color: "#FF69B4",
    },
    input: {
      flex: 1,
      padding: "10px 20px",
      borderRadius: "20px",
      border: "none",
      backgroundColor: "#A9A9A9",
      fontSize: "16px",
      color: "black",
    },
    radioGroup: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      fontSize: "18px",
      fontWeight: "bold",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      marginTop: "30px",
    },
    cancelBtn: {
      backgroundColor: "#FF2E2E",
      color: "white",
      padding: "10px 30px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    saveBtn: {
      backgroundColor: "#2563eb", // Primary blue for saving
      color: "white",
      padding: "10px 30px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    footer: {
      color: "white",
      textAlign: "center",
      marginTop: "auto",
      padding: "20px 0",
    }
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          
          <div style={styles.topNav}>
            <IoArrowBackOutline style={{cursor:"pointer"}} onClick={() => navigate(-1)} />
            <span>Edit User</span>
            <FaUserEdit />
          </div>

          <h2 style={{ marginBottom: "30px" }}>Update Platform User Settings</h2>

          <form style={styles.formCard} onSubmit={handleSave}>
            <div style={styles.formTitle}>User Information</div>

            {/* Full Name */}
            <div style={styles.row}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                placeholder="Enter Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email Address */}
            <div style={styles.row}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div style={styles.row}>
              <label style={styles.label}>Role</label>
              <select style={{...styles.input, maxWidth: "200px"}} name="role" value={formData.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Instructor">Instructor</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Status */}
            <div style={styles.row}>
              <label style={styles.label}>Status</label>
              <div style={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="status" 
                    value="Active" 
                    checked={formData.status === "Active"} 
                    onChange={handleChange} 
                  /> Active
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="status" 
                    value="Suspended" 
                    checked={formData.status === "Suspended"} 
                    onChange={handleChange} 
                  /> Suspended
                </label>
              </div>
            </div>

            {/* Password */}
            <div style={styles.row}>
              <label style={styles.label}>Change Password</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="Leave blank to keep current"
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button type="button" style={styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
            </div>
          </form>

          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </div>
      </div>
    </div>
  );
};

export default EditUser;