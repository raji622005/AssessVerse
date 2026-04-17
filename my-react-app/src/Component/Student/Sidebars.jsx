import React from 'react';
import { useNavigate } from "react-router-dom"; 
import { MdDashboard, MdOutlineAssessment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiExamDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const SidebarA = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem} onClick={() => navigate("/Dashboards")}>
          <MdDashboard size={20} style={styles.icon} /> <span>Dashboard</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/assessmentcatalog")}>
          <FaUsers size={20} style={styles.icon} /> <span>Assessment Catalog</span>
        </li>
        
        <li style={styles.menuItem} onClick={() => navigate("/mysubmission")}>
          <MdOutlineAssessment size={20} style={styles.icon} /> <span>My Submission</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/profiles")}>
          <CgProfile size={20} style={styles.icon} /> <span>Profile</span>
        </li>
        
        {/* Logout pushed to the bottom */}
        <li style={styles.logout1} onClick={handleLogout}>
          <IoLogOutOutline size={20} style={styles.icon} /> <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    /* FIXED POSITIONING */
    position: "fixed",
    top: "90px",             // Adjust this to match the height of your Header
    left: 0,
    width: "250px",
    height: "calc(100vh - 80px)", // Fills the viewport height minus the header
    backgroundColor: "#0A1230",
    color: "white",
    fontFamily: "Acme",
    padding: "50px 10px",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 1000,            // Ensures it stays above main content
    overflowY: "auto",       // Allows the menu to scroll if there are too many items
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",          // Required for marginTop: "auto" to work on logout
    display: "flex",
    flexDirection: "column",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.3s",
    marginBottom: "5px",
    fontSize: "16px",
    
  },
  logout1: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    cursor: "pointer",
    color: "#FF5252",
    borderRadius: "8px",
    transition: "background 0.3s",
    marginBottom: "5px",
    fontSize: "16px",
    
  },
  
  icon: {
    marginRight: "15px",
    flexShrink: 0,
  }
};

export default SidebarA;