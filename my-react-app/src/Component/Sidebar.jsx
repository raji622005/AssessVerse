import {
  FaHome,
  FaBook,
  FaEdit,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarStyle = {
  width: "240px",
  background: "#07102f",
  color: "#fff",
  padding: "20px",
  minHeight: "100vh",
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#4fa3ff",
  marginBottom: "30px",
};

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 0",
  cursor: "pointer",
  opacity: 0.9,
};

const Sidebar = () => {
  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>AssessVerse</div>

      <div style={menuItemStyle}><FaHome /> Dashboard</div>
      <div style={menuItemStyle}><FaBook /> Assessment Catalog</div>
      <div style={menuItemStyle}><FaEdit /> My Submission</div>
      <div style={menuItemStyle}><FaUser /> Profile</div>
      <div style={menuItemStyle}><FaSignOutAlt /> Logout</div>
    </aside>
  );
};

export default Sidebar;