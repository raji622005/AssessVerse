import React, { useState } from 'react';
import AuthHeader from '../../Component/AuthHeader';
import contact2 from '../../assets/img/contact2.png';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Contactus = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const [show, setshow] = useState(false);

  const emailverify = (email) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (email.trim() === "" || message.trim() === "" || subject.trim() === "" || name.trim() === "") {
      alert("Please enter All Fields.");
      return;
    }
    if (!emailverify(email)) {
      alert("Please enter valid email")
      return
    }

    // 2. EmailJS Configuration
    const serviceId = 'service_dfau1vs';
    const templateId = 'template_krg4i8p';
    const publicKey = 'EpIZ1MKklV6s_qx8Q';

    // Matches the {{tags}} in your EmailJS template screenshot
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };

    // 3. Send Email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setshow(true); // Show success overlay
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert("Failed to send message. Please check your connection.");
      });
  }

  const handleback = (e) => {
    e.preventDefault();
    setshow(false);
    // Clearing fields for a new message
    setemail("");
    setname("");
    setmessage("");
    setsubject("");
  }

  return (
    <div style={style.wrap}>
      <AuthHeader />
      
      {/* Success Modal Overlay */}
      {show && (
        <div style={style.overlayBackdrop}>
          <div style={style.overlaybox}>
            <h1 style={style.one}>AssessVerse</h1>
            <div style={style.overlaytext}>
              <h3>Your Form Has Been Submitted Succesfully 🎉</h3>
              <h3>Thank you for contacting AssessVerse. Our team will get back to you within 24 hours.</h3>
              <div style={style.buttonWrapper}>
                <button style={style.btn} onClick={() => { navigate('/home') }}>Back to Home</button>
                <button style={style.btn} onClick={handleback}>Send Another</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <form onSubmit={handlesubmit}>
            <div style={style.block}>
              <div style={style.data1}>
                <label style={style.label1}>Name : </label>
                <input style={style.input1} type="text" placeholder='Enter Name' onChange={(e) => { setname(e.target.value) }} value={name} required />
              </div>
              <div style={style.data1}>
                <label style={style.label1}>Email : </label>
                <input style={style.input1} type="email" placeholder='Enter Email' onChange={(e) => { setemail(e.target.value) }} value={email} required />
              </div>
              <div style={style.data1}>
                <label style={style.label1}>Subject : </label>
                <input style={style.input1} type="text" placeholder=' Enter Subject' onChange={(e) => { setsubject(e.target.value) }} value={subject} required />
              </div>
              <div style={style.data1}>
                <label style={style.label1}>Message : </label>
                <textarea style={style.input2} placeholder=' Enter Message' onChange={(e) => { setmessage(e.target.value) }} value={message} required />
              </div>
              <div style={style.buttonWrapper}>
                <button type="submit" style={style.btn}>Submit</button>
              </div>
            </div>
          </form>
        </div>
        
        <div style={style.right}>
          <img style={style.img} src={contact2} alt="contact decoration" />
        </div>
      </div>
      
      <footer style={{ color: "white", textAlign: "center", padding: "10px" }}>
        © copyrights 2026 AssessVerse
      </footer>
    </div>
  )
}

const style = {
  overlayBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlaybox: {
    textAlign: "center",
    width: "90%",
    maxWidth: "700px",
    backgroundColor: "white",
    border: "5px solid white",
    borderRadius: "20px",
    padding: "50px"
  },
  data1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "20px",
    width: "100%",
    justifyContent: "center",
    gap: "20px"
  },
  label1: {
    color: "white",
    fontSize: "20px",
    fontFamily: "Acme",
    width: "100px",
    textAlign: "right"
  },
  input1: {
    width: "350px",
    height: "40px",
    border: "1px solid rgb(23,39,107)",
    borderRadius: "10px",
    backgroundColor: "rgb(23,39,107)",
    color: "white",
    padding: "0 15px",
    fontSize: "16px",
    outline: "none"
  },
  input2: {
    width: "350px",
    height: "100px",
    border: "1px solid rgb(23,39,107)",
    borderRadius: "10px",
    color: "white",
    backgroundColor: "rgb(23,39,107)",
    padding: "15px",
    fontSize: "16px",
    outline: "none",
    resize: "none"
  },
  block: {
    margin: "50px auto",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    maxWidth: "600px",
    padding: "20px",
    border: "1px solid white",
    borderRadius: "20px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "20px",
  },
  btn: {
    backgroundColor: "#2554EE",
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Acme",
    whiteSpace: "nowrap"
  },
  img: {
    margin: "90px auto",
    width: "80%",
    maxWidth: "500px",
    height: "auto",
  },
  wrap: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(23,39,107)",
    overflowX: "hidden",
  },
  top: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around",
    color: "white",
  },
  left: {
    flex: 1,
    minWidth: "300px",
    padding: "20px"
  },
  right: {
    flex: 1,
    textAlign: "center",
  },
  one: {
    color: "rgb(56,189,248)",
    textAlign: "center",
    fontFamily: "Acme",
    margin: "10px 0",
    fontSize: "60px"
  },
}

export default Contactus;