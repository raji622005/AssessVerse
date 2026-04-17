import React ,{useState }from 'react'
import AuthHeader from '../../Component/AuthHeader'
import signup from '../../assets/img/signup.png'
import { useNavigate } from 'react-router-dom'

const Signuppage = () => {
  const [name,setname]=useState("");
  const [cpassword,setcpassword]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [show,setshow]=useState(false);
  const [role,setrole]=useState("");
  const emailverify=(email)=>{
    const reg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email)
  }
  
  const handlelogin = async (e) => {
  if (e) e.preventDefault();
  
  if(email.trim()==="" || password.trim()==="" || cpassword.trim()==="" || name.trim()==="" ||role.trim()==="")
  {
    alert("Please Enter All Details")    
    return;    
  }

  if(!emailverify(email)){
    alert("Please Enter Valid Email")
    return;
  }

  if(cpassword !== password){
    alert("Enter password correctly")
    return;
  }
  const upperRole = role.toUpperCase().trim();
  if (upperRole !== "STUDENT" && upperRole !== "ADMIN" && upperRole !== "INSTRUCTOR") {
    alert("Enter Valid Role: Student, Admin, or Instructor");
    return;
  }
  try{
    const API_BASE_URL = "https://assessverse.onrender.com";
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        role:upperRole,
        password,
        cpassword,
        
      })
    });

    const data = await res.text();
    console.log(data);

    setshow(true);

  }
  catch(err){
    console.log(err);
  }
}
  const navigate=useNavigate();
  
  return (
    <div style={style.wrap}>
      <AuthHeader/>
       {show && (
        <div style={style.overlayBackdrop}>
        <div style={style.overlaybox}>
          <h1 style={style.one}>AssessVerse</h1>
          <div style={style.overlaytext}>
            <h3>Your have signed in  Succesfully 🎉</h3>
            <h3>Login to Continue With AccessVerse</h3>
            <div style={style.buttonWrapper}>
            <button  style={style.btn}onClick={()=>{navigate('/home')}}>Back to Home</button>
            <button  style={style.btn} onClick={()=>{navigate('/login')}}>Login</button>
            </div>
          </div>
        </div>
        </div>
        
      )}
      <div style={style.top}>
        <div style={style.left}>
          <h1 style={style.one}>AssessVerse</h1>
          <h4 style={style.two}>Signup</h4>
          <div>
            <form>
              <div style={style.data1}>
                <label style={style.label1}>Name : </label>
                <input style={style.input1} type="name" placeholder='Enter Name'value={name}  onChange={(e)=>{setname(e.target.value)}}  required/>
              </div>
              <div style={style.data1}>
                <label style={style.label1}>Email : </label>
                <input style={style.input1}type="email" placeholder='Enter Email'value={email} onChange={(e)=>{setemail(e.target.value)}} required/>
              </div>
              <div style={style.data1}>
                <label style={style.label1}>Role : </label>
                <input style={style.input1} type="role" placeholder='Enter Role (admin,instructor,admin)' value={role}  onChange={(e)=>{setrole(e.target.value)}}  required/>
              </div>
              <div style={style.data1}>
                <label style={style.label1}  >Password : </label>
                <input style={style.input1}type="password"  placeholder=' Enter Password(min 6 characters)'  onChange={(e)=>{setpassword(e.target.value)}}  value={password} required/>
              </div>
             
              <div style={style.data1}>
                <label  style={style.label1} >Conform Password : </label>
                <input style={style.input1}type="password"  placeholder=' Enter Conform Password(min 6 characters)'  onChange={(e)=>{setcpassword(e.target.value)}}  value={cpassword} required/>
              </div>
              </form>
              <div style={style.buttonWrapper}>
              <button style={style.btn} onClick={handlelogin} >Signup & Continue</button>
              </div>
              
            
          </div>
        </div>
        <div style={style.right}>
          <img src={signup} style={style.img}/>
        </div>
      </div>
       <footer style={{color:"white"}}>© copyrights 2026 AssessVerse</footer>
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
  overlaybox:{
    position: "fixed",
    textAlign:"center",
    width:"700px",
    height: "auto",
    margin:'50px 350px',
    backgroundColor:"white",
    border:"5px solid white",
    borderRadius:"20px",
    padding:"50px"
  },
  wrap: {
    height: "100vh", 
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(23,39,107)",
    overflowX: "hidden",
  },
  buttonWrapper: {
  display: "flex",
  justifyContent: "center", 
  width: "100%",            
  marginTop: "20px",
  gap:"20px"
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
  whiteSpace: "nowrap",
  
},
  data1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    padding: "0 15px",
    fontSize: "16px",
    outline: "none"
  },
  top: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
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
    textAlign:"center",
    fontFamily: "Acme", 
    margin: "0px", 
    paddingLeft: "100px", 
    fontSize: "60px" 
  },
  two: { 
    color: "white",
    textAlign:"center", 
    fontFamily: "Acme", 
    paddingLeft: "5px", 
    fontSize: "33px"
  },
  img: { 
    width: "100%",
    maxWidth: "600px",
    height: "auto",
  },
  foot: {
    padding: "20px",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgb(23,39,107)", 
  }
};
 
export default Signuppage
