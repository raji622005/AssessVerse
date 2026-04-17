import React from 'react'
import AuthHeader from '../../Component/AuthHeader';
import { Outlet } from 'react-router-dom';
import Landing from "../../assets/img/Landing.png";
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const navigate=useNavigate();
  return (
    
      
    <div style={style.wrap}>
      <AuthHeader/>
      <div style={style.top}>
        <div style={style.left}>
        <h1 style={style.one}>AssessVerse</h1>
        
        <h2 style={style.two}>Create, Manage and Monitor Assessments with Ease</h2>
        <h5 style={style.three}>Assess Smarter & Evaluate Faster</h5>
        <button style={style.btn} onClick={()=>navigate('/home')}>GET STARTED</button>
        </div>
        <div style={style.right}>
        <img style={style.img} src={Landing} alt="landing"/>
        </div>
        
      
    </div>
     <footer style={style.foot}>© copyrights 2026 AssessVerse</footer>
    </div>

   
  )
}
const style={
  wrap:{
    display: "flex",
    flexDirection: "column",
    Height: "100vh", 
    backgroundColor: "rgb(23,39,107)",
    overflowX: "hidden"
  },
  foot:{
   margin: "0px",
    backgroundColor:"rgb(23,39,107)",
    color:"white",
    textAlign:"center"
  },
  one:{
    color:"rgb(56,189,248)",
    margin:"0px",
    fontSize:"60px"
  },
  two:{
    color:"white",
    fontSize:"35px"
  },
  three:
  {
    color:"white",
    fontSize:"20px"
  },
   top:{
    display: "flex",           
    flexDirection: "row",      
    alignItems: "center",      
    justifyContent: "center",
    margin:"0px",
    backgroundColor:"rgb(23,39,107)",
},
left:{
    flex: 1,
    paddingLeft:"60px",
    paddingRight:"50px",                
},
right:{
    flex: 1,       
      
    textAlign: "right",
    paddingRight:"150px",  
},
btn:{
    color:"#38BDF8",
    border:"5px",
    borderRadius:"50px",
    display:"block"
},
img:{
    width:"700px",
    height:"520px",
    borderRadius:"50px"
}
}

export default Landingpage;
