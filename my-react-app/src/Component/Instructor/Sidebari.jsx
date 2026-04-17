import React from 'react';
import { useNavigate, Link } from "react-router-dom"; 
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
        <li style={styles.menuItem} onClick={() => navigate("/Dashboardi")}>
          <MdDashboard size={20} style={styles.icon} /> <span>Dashboard</span>
        </li>
        <li style={styles.menuItem}>
          <Link to="/assessmentflow" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <FaUsers size={20} style={styles.icon} />
            <span>Create Assessment</span>
          </Link>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/manage")}>
          <PiExamDuotone size={20} style={styles.icon} /> <span>Manage</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/evaluate")}>
          <MdOutlineAssessment size={20} style={styles.icon} /> <span>Submission</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/studoverview")}>
          <CiSettings size={20} style={styles.icon} /> <span>Student Overview</span>
        </li>
        <li style={styles.menuItem} onClick={() => navigate("/Profilei")}>
          <CgProfile size={20} style={styles.icon} /> <span>Profile</span>
        </li>
      </ul>
      <div onClick={handleLogout} style={styles.logout1}>
        <IoLogOutOutline size={20} style={styles.icon} /> <span>Logout</span>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "240px", // FIXED WIDTH
    backgroundColor: "#0A1230",
    color: "white",
    fontFamily: "Acme",
    padding: "20px 10px",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0px", // MATCH HEADER HEIGHT
    left: 0,
    paddingTop: "120px",
    height: "100vh", // FULL REMAINING HEIGHT
    zIndex: 1000,
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