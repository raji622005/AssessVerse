import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from"../../api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { IoArrowBackOutline } from "react-icons/io5";

const EditUser = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  // Fetch existing user data on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          status: res.data.status
        });
      } catch (err) {
        alert("Could not fetch user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("User updated successfully!");
      navigate("/UserManagement");
    } catch (err) {
      alert("Update failed");
    }
  };

  // Reuse your styles from AddUser here...
  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B", display: "flex", flexDirection: "column" },
    layoutContainer: { display: "flex", flex: 1 },
    mainContent: { flex: 1, padding: "20px", color: "white", display: "flex", flexDirection: "column", alignItems: "center" },
    formCard: { backgroundColor: "#D9D9D9", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "700px", color: "#17276B" },
    row: { display: "flex", alignItems: "center", marginBottom: "20px" },
    label: { flex: "0 0 200px", fontSize: "20px", fontWeight: "bold", color: "#FF69B4" },
    input: { flex: 1, padding: "10px 20px", borderRadius: "20px", border: "none", backgroundColor: "#A9A9A9", fontSize: "16px" },
    buttonGroup: { display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px" },
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={{ alignSelf: 'flex-start', fontSize: '24px', marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate(-1)}>
             <IoArrowBackOutline /> Edit User
          </div>

          <div style={styles.formCard}>
            <div style={{textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', textDecoration: 'underline'}}>Edit User Information</div>
            
            <div style={styles.row}>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div style={styles.row}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div style={styles.row}>
              <label style={styles.label}>Role</label>
              <select style={styles.input} name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div style={styles.row}>
              <label style={styles.label}>Status</label>
              <select style={styles.input} name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div style={styles.buttonGroup}>
              <button style={{backgroundColor: '#FF2E2E', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '10px', cursor: 'pointer'}} onClick={() => navigate(-1)}>Cancel</button>
              <button style={{backgroundColor: '#4CAF50', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '10px', cursor: 'pointer'}} onClick={handleUpdate}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;