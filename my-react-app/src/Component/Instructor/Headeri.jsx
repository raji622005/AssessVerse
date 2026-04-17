import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from "../../assets/img/logo.png";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";

const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={style.headers}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img 
            src={logo} 
            alt="logo" 
            style={{ height: "52px", marginBottom: "4px" }} 
          />
          <h1 style={style.one}>AssessVerse</h1>
        </div>

        <div>
          <input type="text" placeholder="Search.." style={style.searchInput} />
        </div>

        <ul style={style.head}>
          <FaBell size={35} color={"white"} style={{ cursor: "pointer" }} onClick={()=>{navigate("/notificationi")}} />
          
          <CgProfile 
            size={35} 
            color={"white"} 
            style={{ cursor: "pointer" }} 
            onClick={() => navigate("/Profilei")} 
          />
        </ul>
      </div>
      <Outlet />
    </>
  );
};

const style = {
  headers: {
    display: "flex",
    fontFamily: "Acme",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 30px",
    backgroundColor: "#0A1230",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100px", // FIXED HEIGHT
    zIndex: 1001,
    boxSizing: "border-box"
  },
  one: {
    color: "rgb(56,189,248)",
    fontFamily: "Acme",
    margin: "0px",
    fontSize: "11px",
    letterSpacing: "1.2px",
    textTransform: "uppercase"
  },
  searchInput: {
    padding: "5px 15px",
    width: "350px",
    height: "26px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "13px"
  },
  head: {
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    gap: "18px",
    margin: 0,
    padding: 0
  }
};

export default AuthHeader;