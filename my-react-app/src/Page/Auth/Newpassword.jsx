import React, { useState } from 'react';
import New from '../../assets/img/new.png';
import AuthHeader from '../../Component/AuthHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Newpassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the email passed from the OTP page
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // API call to your backend
      const response = await axios.post('http://localhost:5000/new', {
        email: email,
        newPassword: password
      });

      if (response.status === 200) {
        setShowSuccess(true);
      }
    } catch (err) {
      console.error("Reset Error:", err);
      console.log("Sending to backend:", email, password);
      alert(err.response?.data?.message || "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRedirect = () => {
    setShowSuccess(false);
    navigate('/login');
  };

  return (
    <div style={style.wrap}>
      <AuthHeader />

      {/* Success Modal */}
      {showSuccess && (
        <div style={style.overlayBackdrop}>
          <div style={style.overlaybox}>
            <h1 style={{...style.one, fontSize: "40px"}}>AssessVerse</h1>
            <div style={style.overlaytext}>
              <h3 style={{ color: "black", margin: "10px 0" }}>Success! 🎉</h3>
              <p style={{ color: "#555", margin: "20px 0", fontSize: "16px" }}>
                Your password for <strong>{email}</strong> has been updated.
              </p>
              <div style={style.buttonGroup}>
                <button style={style.btn} onClick={handleFinalRedirect}>Go to Login</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <h4 style={style.two}>New Password</h4>
          <h6 style={style.three}>Set a strong password to protect your account.</h6>
          
          <form onSubmit={handlesubmit}>
            <div style={style.data1}>
              <label style={style.label1}>New Password :</label>
              <input 
                style={style.input1} 
                type="password" 
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div style={style.data1}>
              <label style={style.label1}>Confirm Password :</label>
              <input 
                style={style.input1} 
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div style={style.buttonGroup}>
              <button 
                type="submit" 
                style={{ ...style.btn, opacity: loading ? 0.7 : 1 }} 
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
        
        <div style={style.right}>
          <img style={style.img} src={New} alt="Reset Password Illustration" />
        </div>
      </div>
      <footer style={{ color: "white", textAlign: "center", paddingBottom: "10px", fontSize: "12px" }}>
        © copyrights 2026 AssessVerse
      </footer>
    </div>
  );
};

// Styles remain largely the same, ensuring consistent alignment
const style = {
  overlayBackdrop: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex",
    justifyContent: "center", alignItems: "center", zIndex: 1000,
  },
  overlaybox: {
    textAlign: "center", width: "90%", maxWidth: "450px",
    backgroundColor: "white", borderRadius: "20px", padding: "30px",
  },
  wrap: { height: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "rgb(23,39,107)", overflowX: "hidden" },
  top: { display: "flex", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", color: "white", padding: "0 40px" },
  left: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center" },
  right: { flex: 1, textAlign: "center" },
  one: { color: "rgb(56,189,248)", fontFamily: "Acme", textAlign: "center", margin: "0px", fontSize: "60px" },
  two: { color: "white", textAlign: "center", fontFamily: "Acme", fontSize: "35px", marginTop: "10px" },
  three: { color: "white", textAlign: "center", fontFamily: "Acme", fontSize: "15px", marginBottom: "30px", opacity: 0.8 },
  img: { width: "100%", maxWidth: "450px", height: "auto", borderRadius: "30px" },
  buttonGroup: { display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" },
  btn: { backgroundColor: "#2554EE", color: "white", padding: "12px 40px", border: "none", borderRadius: "5px", cursor: "pointer", fontFamily: "Acme", fontSize: "18px" },
  data1: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px", width: "100%", justifyContent: "center", gap: "20px" },
  label1: { color: "white", fontSize: "18px", fontFamily: "Acme", width: "140px", textAlign: "right" },
  input1: { width: "320px", height: "40px", border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", padding: "0 15px", fontSize: "16px", outline: "none" },
};

export default Newpassword;