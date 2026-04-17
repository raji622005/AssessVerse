import React, { useState } from 'react';
import AuthHeader from '../../Component/AuthHeader';
import forget from '../../assets/img/forget.png';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyemail = (emailInput) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(emailInput);
  };

  const handleemail = (e) => {
    e.preventDefault();

    if (!verifyemail(email)) {
      alert("Please Enter a Valid Email address");
      return;
    }

    setLoading(true);

    // 1. Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. These match your "Test It" screenshot perfectly
    const serviceId = 'service_dfau1vs'; 
    const templateId = 'template_m5mah39'; 
    const publicKey = 'EpIZ1MKklV6s_qx8Q';

    // 3. These keys match your dashboard {{variables}} (image_c9e498.png)
    const templateParams = {
      email: email,       // Maps to {{email}} in 'To Email' field
      otp: generatedOtp,  // Maps to {{otp}} in template content
      name: "AssessVerse User", // Maps to {{name}} in 'From Name' field
    };

    emailjs.send(serviceId, templateId,templateParams, publicKey)
      .then((response) => {
        console.log('OTP Sent Successfully!', response.status, response.text);
        // 4. Move to OTP screen
        navigate('/otp', { state: { email: email, sentOtp: generatedOtp }, replace: true });
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        alert(`Failed: ${err.text || "Please check your network."}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={style.wrap}>
      <AuthHeader />
      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <h4 style={style.two}>Forgot Password</h4>
          <h6 style={style.three}>Enter your registered email to receive an OTP.</h6>
          
          <form onSubmit={handleemail}>
            <div style={style.data1}>
              <label style={style.label1}>Email :</label>
              <input 
                style={style.input1} 
                type="email" 
                value={email} 
                onChange={(e) => setemail(e.target.value)} 
                placeholder='Enter email' 
                required 
              />
            </div>
            <div style={style.buttonGroup}>
              <button 
                type="submit" 
                style={{ ...style.btn, opacity: loading ? 0.7 : 1 }} 
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
        
        <div style={style.right}>
          <img src={forget} style={style.img} alt="forget" />
        </div>
      </div>
      <footer style={{ color: "white", textAlign: "center", paddingBottom: "10px" }}>
        © copyrights 2026 AssessVerse
      </footer>
    </div>
  );
};

const style = {
  wrap: { height: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "rgb(23,39,107)", overflowX: "hidden" },
  top: { display: "flex", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", color: "white", padding: "0 20px" },
  left: { flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center" },
  right: { flex: 1, textAlign: "center" },
  one: { color: "rgb(56,189,248)", fontFamily: "Acme", textAlign: "center", margin: "0px", fontSize: "60px" },
  two: { color: "white", textAlign: "center", fontFamily: "Acme", fontSize: "35px", marginTop: "10px" },
  three: { color: "white", textAlign: "center", fontFamily: "Acme", fontSize: "15px", marginBottom: "30px", maxWidth: "400px" },
  buttonGroup: { display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px", width: "100%" },
  img: { width: "100%", maxWidth: "500px", height: "auto", borderRadius: "20px" },
  btn: { backgroundColor: "#2554EE", color: "white", padding: "12px 40px", border: "none", borderRadius: "5px", cursor: "pointer", fontFamily: "Acme", fontSize: "18px" },
  data1: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px", width: "100%", justifyContent: "center", gap: "20px" },
  label1: { color: "white", fontSize: "20px", fontFamily: "Acme", width: "80px", textAlign: "right" },
  input1: { width: "350px", height: "40px", border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", padding: "0 15px", fontSize: "16px", outline: "none" },
};

export default Forgotpassword;