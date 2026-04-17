import React, { useState } from 'react';
import Login from '../../assets/img/Login.png';
import AuthHeader from '../../Component/AuthHeader';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e, selectedRole) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      const data = await response.json();

      
      if (response.ok) {
  alert("Login Successful!");

  if (data.token) {
    localStorage.setItem("token", data.token);
    
    // FIXED: Mapping data.userId from backend to _id for the frontend
    const userSession = {
      _id: data.userId, // Matches the new key in your backend response
      name: data.userName,
      role: data.role
    };
    localStorage.setItem("user", JSON.stringify(userSession));
  }
        const roleRoutes = {
          admin: '/DashboardA',
          instructor: '/Dashboardi',
          student: '/Dashboards'
        };
        const targetPath = roleRoutes[selectedRole] || '/';
        navigate(targetPath);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Server is not responding. Please try again later.");
    }
  };

  return (
    <div style={style.wrap}>
      <AuthHeader />
      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <h2 style={style.two}>Login</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={style.data1}>
              <label style={style.label1}>Email : </label>
              <input 
                style={style.input1} 
                type="email" 
                placeholder=' Enter Email' 
                onChange={(e) => { setemail(e.target.value) }} 
                value={email} 
                required 
              />
            </div>
            <div style={style.data1}>
              <label style={style.label1}>Password : </label>
              <input 
                style={style.input1} 
                type="password" 
                placeholder=' Enter Password(min 6 characters)' 
                onChange={(e) => { setpassword(e.target.value) }} 
                value={password} 
                required 
              />
            </div>
          </form>
          <h4 style={style.forgetPassword} onClick={() => { navigate('/forget') }}>Forget Password?</h4>
          <div style={style.buttonGroup}>
            <button style={style.btn} onClick={(e) => handleLogin(e, "student")}>Login as student</button>
            <button style={style.btn} onClick={(e) => handleLogin(e, "instructor")}>Login as Instructor</button>
            <button style={style.btn} onClick={(e) => handleLogin(e, "admin")}>Login as Admin</button>
          </div>
          <h4 style={{ paddingLeft: "310px", color: "white", fontFamily: "Acme", marginTop: "20px" }}>
            Don’t have an account ? <u style={{ color: "#38BDF8", cursor: "pointer" }} onClick={() => { navigate("/Signup") }}>SIGNUP</u>
          </h4>
        </div>
        <div style={style.right}>
          <img style={style.image} src={Login} alt="Login Illustration" />
        </div>
      </div>
      <footer style={style.footer}>© copyrights 2026 AssessVerse</footer>
    </div>
  );
};

// ... styles remain unchanged ...
const style = {
  wrap: { height: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "rgb(23,39,107)", overflow: "hidden" },
  top: { display: "flex", flex: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around", padding: "0 40px" },
  left: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center" },
  right: { flex: 1, display: "flex", justifyContent: "center" },
  image: { width: "100%", maxWidth: "550px", height: "auto" },
  one: { color: "rgb(56,189,248)", fontFamily: "Acme", fontSize: "60px", margin: "0 0 10px 0" },
  two: { color: "white", fontFamily: "Acme", fontSize: "32px", margin: "0 0 40px 0" },
  data1: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px", width: "100%", justifyContent: "center", gap: "20px" },
  label1: { color: "white", fontSize: "20px", fontFamily: "Acme", width: "100px", textAlign: "right" },
  input1: { width: "350px", height: "40px", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", padding: "0 15px", fontSize: "16px", outline: "none" },
  forgetPassword: { color: "white", fontFamily: "Acme", fontSize: "14px", width: "470px", textAlign: "right", margin: "-10px 0 20px 0", cursor: "pointer" },
  buttonGroup: { display: "flex", flexDirection: "row", justifyContent: "center", gap: "15px", marginTop: "20px", width: "100%" },
  btn: { backgroundColor: "#2554EE", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
  footer: { textAlign: "center", color: "white", padding: "15px", fontSize: "14px", fontFamily: "Acme" }
};

export default Loginpage;