import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from"../../api/axiosConfig"; 
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    status: "Active",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // 1. Validation check
    if (!formData.fullName || !formData.email || !formData.password || !formData.role || formData.role === "Select Role") {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      // 2. Get the token from local storage
      const token = localStorage.getItem("token");

      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(),
        status: formData.status
      };

      // 3. Make the request with the Authorization header
      const res = await axios.post("/api/users/register", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 201 || res.status === 200) {
        alert("User has been created Successfully !!");
        navigate("/admin/user-management");
      }
    } catch (err) {
      // 4. Log the specific error for debugging
      console.error("Backend Error Detail:", err.response?.data);
      alert(err.response?.data?.message || "Error creating user. Check console for details.");
    }
  };

  // ... (Your styles stay the same)
  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", display: "flex", flexDirection: "column" },
    layoutContainer: { display: "flex", flex: 1 },
    mainContent: { flex: 1, padding: "20px", color: "white", display: "flex", flexDirection: "column", alignItems: "center" },
    topNav: { display: "flex", alignItems: "center", gap: "10px", alignSelf: "flex-start", fontSize: "24px", marginBottom: "20px" },
    formCard: { backgroundColor: "#D9D9D9", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "700px", color: "#17276B" },
    formTitle: { textAlign: "center", fontSize: "22px", fontWeight: "bold", marginBottom: "30px", textDecoration: "underline" },
    row: { display: "flex", alignItems: "center", marginBottom: "20px" },
    label: { flex: "0 0 200px", fontSize: "20px", fontWeight: "bold", color: "#FF69B4" },
    input: { flex: 1, padding: "10px 20px", borderRadius: "20px", border: "none", backgroundColor: "#A9A9A9", fontSize: "16px", color: "black" },
    radioGroup: { display: "flex", gap: "20px", alignItems: "center", fontSize: "18px", fontWeight: "bold" },
    buttonGroup: { display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px" },
    cancelBtn: { backgroundColor: "#FF2E2E", color: "white", padding: "10px 30px", border: "none", borderRadius: "10px", cursor: "pointer" },
    createBtn: { backgroundColor: "#4CAF50", color: "white", padding: "10px 30px", border: "none", borderRadius: "10px", cursor: "pointer" },
    footer: { color: "white", textAlign: "center", marginTop: "auto", padding: "20px 0" }
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={styles.topNav}>
            <IoArrowBackOutline style={{cursor:"pointer"}} onClick={() => navigate(-1)} />
            <span>Add User</span>
            <FaUserPlus />
          </div>
          <h2 style={{ marginBottom: "30px" }}>Create a new platform User !</h2>
          <div style={styles.formCard}>
            <div style={styles.formTitle}>User Information</div>
            <div style={styles.row}>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} name="fullName" placeholder="Enter Name" value={formData.fullName} onChange={handleChange} />
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Role</label>
              <select style={{...styles.input, maxWidth: "200px"}} name="role" value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Instructor">Instructor</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Status</label>
              <div style={styles.radioGroup}>
                <label><input type="radio" name="status" value="Active" checked={formData.status === "Active"} onChange={handleChange} /> Active</label>
                <label><input type="radio" name="status" value="Suspended" checked={formData.status === "Suspended"} onChange={handleChange} /> Suspended</label>
              </div>
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Temporary Password</label>
              <input style={styles.input} type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
              <button style={styles.createBtn} onClick={handlesubmit}>Create User</button>
            </div>
          </div>
          <footer style={styles.footer}>© copyrights 2026 AssessVerse</footer>
        </div>
      </div>
    </div>
  );
};

export default AddUser;