import React from 'react';
import home from "../../assets/img/home.png";
import AuthHeader from '../../Component/AuthHeader';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const navigate=useNavigate();
  return (

    <div style={style.wrap}> 
      <AuthHeader/>
      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <h2 style={style.two}> "Assess Smarter & Evaluate Faster"</h2>

          
          <div style={{paddingLeft:"220px"}}>
            <button style={style.btn} onClick={()=>{navigate('/login')}}>Login</button>
          </div>
          <h5 style={{paddingLeft:"190px",color:"white"}}> ( If Account Already Exists ? ) </h5> 
          <h4 style={{paddingLeft:"250px",color:"white"}}>OR</h4>
          <div style={{paddingLeft:"220px"}}>
            <button style={style.btn} onClick={()=>{navigate('/signup')}}>Signup</button>
          </div>
          <h5 style={{paddingLeft:"200px", display:"block",color:"white"}}>( Create New Account ) </h5>
        </div>

        <div style={style.right}>
          <img src={home} alt="home" style={style.img}/>
        </div>
      </div>
      <footer style={style.foot}>© copyrights 2026 AssessVerse</footer>
    </div>
  
  );
  
};
const style = {
  wrap: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(23,39,107)",
    overflowX: "hidden",
    margin: 0, 
    padding: 0
  },
  top: {
    display: "flex",
    flex: 1, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  left: { 
    flex: 1, 
    minWidth: "300px", 
    paddingLeft: "60px" 
  },
  right: { 
    flex: 1, 
    textAlign: "right", 
    paddingRight: "150px" 
  },
  one: { 
    color: "rgb(56,189,248)", 
    fontFamily: "Acme", 
    margin: "0px", 
    paddingLeft: "100px", 
    fontSize: "60px" 
  },
  two: { 
    color: "white", 
    fontFamily: "Acme", 
    paddingLeft: "5px", 
    fontSize: "35px" 
  },
  img: { 
    width: "100%", 
    maxWidth: "600px", // Better for different screen sizes than a fixed width
    height: "auto", 
    borderRadius: "50px" 
  },
  btn: { 
    backgroundColor: "#2554EE", 
    color: "white", 
    padding: "10px 20px", 
    border: "none", 
    borderRadius: "5px",
    cursor: "pointer" // Added for better UX
  },
  foot: {
    padding: "20px",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgb(23,39,107)", // Kept this to ensure footer matches theme
  }
};


export default Homepage;