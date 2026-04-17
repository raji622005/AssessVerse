import { FaBell, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const topbarStyle = {
  background: "#0c1b4d",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const searchStyle = {
  width: "300px",
  padding: "8px 12px",
  borderRadius: "20px",
  border: "none",
  outline: "none",
};

const iconGroupStyle = {
  display: "flex",
  gap: "15px",
  fontSize: "18px",
  cursor: "pointer",
};

const Topbar = () => {
  return (
    <div style={topbarStyle}>
      <input type="text" placeholder="Search" style={searchStyle} />
      <div style={iconGroupStyle}>
        <FaBell />
        <FaCalendarAlt />
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Topbar;