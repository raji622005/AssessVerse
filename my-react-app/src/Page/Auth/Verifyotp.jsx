import React, { useState, useRef } from 'react';
import AuthHeader from '../../Component/AuthHeader';
import otpImg from '../../assets/img/otp.png'; 
import { useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Verifyotp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 1. Retrieve data passed from Forgotpassword.js
    const email = location.state?.email || "your email";
    const [correctOtp, setCorrectOtp] = useState(location.state?.sentOtp || "");

    const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
    const [show1, setshow1] = useState(false); // Success Modal for Resend
    const [show2, setshow2] = useState(false); // Success Modal for Verification
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    // Handle Input Change and Auto-focus
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otpValues];
        newOtp[index] = element.value;
        setOtpValues(newOtp);

        // Focus next input automatically
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle Backspace for better UX
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otpValues.join("");
        if (enteredOtp === correctOtp) {
            setshow2(true);
        } else {
            alert("Invalid OTP. Please check the code sent to your email.");
        }
    };

    const handleResend = () => {
        setLoading(true);
        const newGeneratedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Match these keys EXACTLY with your EmailJS Template variables
        const templateParams = {
            name: "AssessVerse Security", // Matches {{name}}
            email: email,                 // Matches {{email}}
            otp: newGeneratedOtp,         // Matches {{otp}}
        };

        // Updated with your confirmed working Service and Template IDs
        const serviceId = 'service_dfau1vs'; 
        const templateId = 'template_m5mah39'; 
        const publicKey = 'EpIZ1MKklV6s_qx8Q';

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                setCorrectOtp(newGeneratedOtp);
                setshow1(true); // Show "Resent successfully" modal
                setOtpValues(new Array(6).fill("")); // Clear inputs
                inputRefs.current[0].focus(); // Refocus first box
            })
            .catch((err) => {
                console.error("Resend Error:", err);
                alert("Failed to resend OTP. " + (err.text || "Check your connection."));
            })
            .finally(() => setLoading(false));
    };

    const handlenext = () => {
    console.log("Navigating to new password for:", email);
    setshow2(false);
    // Ensure '/new' is the EXACT path defined in App.js
    navigate('/new', { state: { email: email } }); 
};
    return (
        <div style={style.wrap}>
            <AuthHeader />
            
            {/* Modal: OTP Resent Successfully */}
            {show1 && (
                <div style={style.overlay}>
                    <div style={style.modal}>
                        <h2 style={style.one}>AssessVerse</h2>
                        <h4 style={{color: "black", marginTop: "20px"}}>OTP has been re-sent to:</h4>
                        <p style={{color: "#555"}}>{email}</p>
                        <button style={style.btn} onClick={() => setshow1(false)}>Got it</button>
                    </div>
                </div>
            )}

            {/* Modal: OTP Verified Successfully */}
            {show2 && (
                <div style={style.overlay}>
                    <div style={style.modal}>
                        <h2 style={style.one}>AssessVerse</h2>
                        <h4 style={{color: "black", marginTop: "20px"}}>OTP Verified Successfully! 🎉</h4>
                        <p style={{color: "#555", marginBottom: "20px"}}>You can now set your new password.</p>
                        <button style={style.btn} onClick={handlenext}>Set New Password</button>
                    </div>
                </div>
            )}

            <div style={style.top}>
                <div style={style.left}>
                    <h1 style={style.one}>AssessVerse</h1>
                    <h3 style={style.two}>Verify OTP</h3>
                    <h5 style={style.three}>We've sent a 6-digit code to <br/><strong>{email}</strong></h5>
                    
                    <div style={style.otpContainer}>
                        {otpValues.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                style={style.otpInput}
                                maxLength="1"
                                value={data}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <div style={style.buttonGroup}>
                        <button 
                            style={{ ...style.btnResend, opacity: loading ? 0.6 : 1 }} 
                            onClick={handleResend}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Resend OTP"}
                        </button>
                        <button style={style.btn} onClick={handleVerify}>Verify Code</button>
                    </div>
                </div>
                
                <div style={style.right}>
                    <img src={otpImg} style={style.img} alt="OTP Illustration" />
                </div>
            </div>
            <footer style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", paddingBottom: "15px", fontSize: "12px" }}>
                © copyrights 2026 AssessVerse
            </footer>
        </div>
    );
};

const style = {
    wrap: { height: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "rgb(23,39,107)", overflow: "hidden" },
    overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modal: { textAlign: "center", width: "90%", maxWidth: "400px", backgroundColor: "white", borderRadius: "20px", padding: "30px" },
    top: { display: "flex", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", color: "white" },
    left: { flex: 1, padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center" },
    right: { flex: 1, textAlign: "center" },
    one: { color: "rgb(56,189,248)", fontFamily: "Acme", fontSize: "60px", margin: "0" },
    two: { fontFamily: "Acme", fontSize: "35px", margin: "10px 0" },
    three: { fontFamily: "Acme", fontSize: "16px", opacity: 0.8, marginBottom: "30px", fontWeight: "normal", lineHeight: "1.5" },
    otpContainer: { display: "flex", gap: "12px", justifyContent: "center", marginBottom: "35px" },
    otpInput: { width: "50px", height: "55px", textAlign: "center", fontSize: "24px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", fontWeight: "bold", outline: "none" },
    buttonGroup: { display: "flex", gap: "20px", justifyContent: "center" },
    btn: { backgroundColor: "#2554EE", color: "white", padding: "12px 30px", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "Acme", fontSize: "16px" },
    btnResend: { backgroundColor: "transparent", color: "rgb(56,189,248)", padding: "12px 20px", border: "1px solid rgb(56,189,248)", borderRadius: "8px", cursor: "pointer", fontFamily: "Acme", fontSize: "16px" },
    img: { width: "100%", maxWidth: "480px", height: "auto", borderRadius: "30px" }
};

export default Verifyotp;