import { Outlet, useNavigate } from 'react-router-dom';
import  logo from "../assets/img/logo.png";
import { Navigate } from 'react-router-dom';
const AuthHeader = () => {
  const navigate=useNavigate();
  return (
    <>
    <div style={style.headers}>
      <div>
        <img src={logo} alt="logo" style={{height:"150px"}}/>
      </div>
      <ul style={style.head}>
            <p style={style.hea1} onClick={()=>navigate("/home")}>Home</p>
            <p style={style.hea1} onClick={()=>navigate("/login")}>Login</p>
            <p style={style.hea1} onClick={()=>navigate("/signup")}>Signup</p>
            <p style={style.hea1} onClick={()=>navigate("/contact")}>Contact us</p>
        </ul>
     
    </div>
    <Outlet/>
    </>
    
  )
}
const style={

 headers:{
  
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",            
  padding: "20px 100px",             
  backgroundColor:"rgb(23,39,107)"

 },

 head:{

 display: "flex",
  listStyle:"none",
  gap:"30px"

 },

 hea1:{
  fontFamily:"Acme",
 color: "white",
 fontSize:"25px",                  
  textDecoration:"none",
  fontWeight: "500"
 

}

}

export default AuthHeader;
