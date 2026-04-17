import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from"../../api/axiosConfig";
import HeaderA from "../../Component/Admin/HeaderA";
import SidebarA from "../../Component/Admin/SidebarA";
import { ChevronDown } from "lucide-react";

const UserManagement = () => {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" }); // New state for alerts
  const dropdownRef = useRef(null);

  // Helper to show notifications and hide them after 3 seconds
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      showNotification("Failed to load users from database.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id) => {
    // Standard confirm is still okay, but let's remove the subsequent alerts
    const confirmDelete = window.confirm("Are you sure? This user will be deleted permanently.");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUsers(users.filter((user) => user._id !== id)); 
        showNotification("User deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        showNotification("Could not delete user.", "error");
      }
    }
  };
  // This logic should sit inside your component, before the return statement
const filteredUsers = users.filter((user) => {
  if (roleFilter === "All") return true;
  
  // Ensure the comparison matches your DB casing (usually lowercase 'student'/'instructor')
  return user.role.toLowerCase() === roleFilter.toLowerCase();
});

  const styles = {
    body: { margin: 0, width: "100vw", minHeight: "100vh", fontFamily: "Acme", backgroundColor: "#17276B" },
    layoutContainer: { display: "flex" },
    mainContent: { flex: 1, padding: "20px", color: "white", display: "flex", flexDirection: "column", position: 'relative',marginTop:"80px",marginLeft:"220px" },
    // Notification Style
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      backgroundColor: notification.type === 'error' ? '#FF5252' : '#4CAF50',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 2000,
      transition: 'all 0.3s ease'
    },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "15px", borderRadius: "10px", position: "relative" },
    dropdownTrigger: { backgroundColor: "white", color: "black", padding: "8px 15px", borderRadius: "20px", fontSize: "14px", cursor: "pointer", minWidth: "160px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", userSelect: "none" },
    dropdownMenu: { position: 'absolute', top: '120%', left: '0', width: '100%', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.3)', zIndex: 1000, overflow: 'hidden', padding: '5px 0' },
    dropdownItem: { padding: '10px 15px', cursor: 'pointer', fontSize: '14px', color: '#333', textAlign: 'left' },
    clearItem: { padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#17276B' },
    table: { width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" },
    addBtn: { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    th: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "20px", fontWeight: "normal" },
    td: { padding: "15px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px" },
  };

  return (
    <div style={styles.body}>
      <HeaderA />
      {/* Custom Notification Toast */}
      {notification.message && (
        <div style={styles.toast}>
          {notification.message}
        </div>
      )}

      <div style={styles.layoutContainer}>
        <SidebarA />
        <div style={styles.mainContent}>
          <div style={{ marginBottom: "20px" }}>
            <h2>User Management</h2>
          </div>

          <div style={styles.topBar} ref={dropdownRef}>
            <div 
              style={styles.dropdownTrigger} 
              onClick={() => setOpenDropdown(openDropdown === "role" ? null : "role")}
            >
              Filter : {roleFilter} <ChevronDown size={16} />
              {openDropdown === "role" && (
                <div style={styles.dropdownMenu}>
                  <div 
                    style={styles.clearItem} 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setRoleFilter("All"); 
                      setOpenDropdown(null); 
                    }}
                  >
                    All
                  </div>
                  {["Instructor", "Student"].map((role) => (
                    <div 
                      key={role} 
                      style={styles.dropdownItem}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setRoleFilter(role); 
                        setOpenDropdown(null); 
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => navigate("/adduser")} style={styles.addBtn}>
              Add User
            </button>
          </div>

          {loading ? (
            <p style={{textAlign: 'center', fontSize: '20px'}}>Loading users...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={{ textAlign: "center", backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} style={{ borderBottom: "1px solid #17276B" }}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.role}</td>
                    <td style={{ 
                        color:  "#4CAF50",
                        padding: "15px", border: "1px solid rgba(255,255,255,0.2)" 
                    }}>
                      Active
                    </td>
                    <td style={styles.td}>
                      <button 
                        style={{backgroundColor:"#2196F3", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer"}} 
                        onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)} 
                        style={{ marginLeft: "10px", backgroundColor:"#F44336", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer"}}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <footer style={{color:"white", textAlign:"center", marginTop:"40px", paddingBottom: "20px"}}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;