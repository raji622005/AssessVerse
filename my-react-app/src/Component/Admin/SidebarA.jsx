import React from 'react';
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineAssessment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiExamDuotone } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const SidebarA = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Smoother transition
  };
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem} onClick={() => navigate("/DashboardA")}>
          <MdDashboard size={20} style={styles.icon} /> <span>Dashboard</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/UserManagement")}>
          <FaUsers size={20} style={styles.icon} /> <span>User Management</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/assessmentoversight")}>
          <PiExamDuotone size={20} style={styles.icon} /> <span>Assessment Oversight</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/logsreport")}>
          <MdOutlineAssessment size={20} style={styles.icon} /> <span>Logs & Reports</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/platformsettings")}>
          <CiSettings size={20} style={styles.icon} /> <span>Platform Settings</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/profileA")}>
          <CgProfile size={20} style={styles.icon} /> <span>Profile</span>
        </li>
        <li onClick={handleLogout} style={styles.logout1}>
          <IoLogOutOutline size={20} style={styles.icon} /> <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#0A1230",
    color: "white",
    fontFamily: "Acme",
    padding: "80px 10px",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    
    /* FIXED POSITIONING */
    position: "fixed",
    top: "70px", // Starts below the header
    left: 0,
    height: "calc(100vh - 70px)", // Fills the rest of the screen
    zIndex: 1000,
    overflowY: "auto", // Allows the sidebar to scroll if items overflow
    boxSizing: "border-box"
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.3s",
    marginBottom: "5px",
  },
  logout1: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    cursor: "pointer",
    color: "#FF5252",
    marginTop: "auto",
  },
  icon: {
    marginRight: "15px",
    flexShrink: 0,
  }
};

export default SidebarA;