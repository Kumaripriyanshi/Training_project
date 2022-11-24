import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/authentication.css'
import BlogMcontext from '../context/BlogsMcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
  const context=useContext(BlogMcontext)
  const setuserLogged =context.setuserLogged
const [loginCredentials,setloginCredentials]=useState({username:"",password:""})
const [SignUpcredentials ,setSignUpcredentials]=useState({username:"",email:"",password:"",confirm_password:""})
const navigate=useNavigate()
const [loginClicked,setLoginClicked]=useState("login")
const setAuthToken=context.setAuthToken
const setClick=context.setClick


const handleLOGINChange=(e)=>{
    setloginCredentials({...loginCredentials,[e.target.id]:e.target.value})
}

const handleSIGNUPChange=(e)=>{
  setSignUpcredentials({...SignUpcredentials,[e.target.id]:e.target.value})
}

const SignUpClick=()=>{
  setLoginClicked(prev=> prev='signup')
 

  // document.getElementsByClassName('Login-container')[0].style.height="39rem"
}

const handleClosebtn=()=>{
props.setClick(prev=> prev=false)
}
const LoginClick=async ()=>{
   setLoginClicked(prev=> prev='login')
  // document.getElementsByClassName('Login-container')[0].style.height="39rem"

}
const LoginUserAPI=async (e)=>{
  e.preventDefault()
  const {username,password}=loginCredentials
  console.log("login",username,password)
  let url="http://localhost:5000/api/auth/login"
    const response=await fetch(url,{
        method:"POST",
        headers:{
        "Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    }
    )

    const json=await response.json()
    console.log("======",json)
    if(json.errors!=="Enter proper credentials "){

      localStorage.setItem("auth-token",json)
      setAuthToken(prev=> prev=json)
      console.log(localStorage.getItem('auth-token'))
        setuserLogged(prev=> prev=true)
      setClick(prev=>prev=false)
    }else{
      toast('Invalid Credentials', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style:{
          "backgroundColor":"red",
          'zIndex':"1",
          "position":"absolute",
          "top":"5rem",
          "left":"5.6rem",
          "color":"white"
        }
        });
    }
    
    // json && navigate("/write")
}

const SignUpClickAPI=async ()=>{
  let url="http://localhost:5000/api/auth/createUser"
  const {username,email,password,confirm_password}=SignUpcredentials
  const response=await fetch(url,{
      method:"POST",
      headers:{
      "Content-Type":"application/json"},
      body:JSON.stringify({username,email,password,confirm_password})
  }
  )
  console.log(response)
  const json=await response.json()
  console.log("sign up json",json)
 if(json.errors){
  //  console.log(json)
  //  setuserLogged(prev=> prev=false)
  toast('Password do not match', {
    position: "top-center",
    autoClose: 9000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style:{
      "backgroundColor":"red",
      'zIndex':"1",
      "position":"absolute",
      "top":"5rem",
      "left":"5.6rem",
      "color":"white"
    }
    });

    
    
 }else{
 
    // console.log("yepp inside")
    // localStorage.setItem("auth-token",json)
    //   setAuthToken(prev=> prev=json)
    //   console.log(localStorage.getItem('auth-token'))
    //     setuserLogged(prev=> prev=true)
    //   setClick(prev=>prev=false)
 }
  // localStorage.setItem("auth-token",json)
}
  return (
    <>
    <div className='Login-container' >
      <button style={{"marginLeft":"90%","width":"2rem","height":"2rem","borderRadius":"5rem","marginTop":"0.4rem","boxSizing":"border-box","marginBottom":"-1.8rem","fontWeight":"bold","cursor":"pointer" }} onClick={handleClosebtn}>&times;</button>
  <div className='btn'> <input type="button"  value="LOGIN" onClick={LoginClick} style={{"backgroundColor":"rgb(17 21 21 / 80%)","color": "white"}}/>
   <input type="button" value="SIGN UP"  onClick={SignUpClick} style={{"backgroundColor":"#d1cdce"}} /></div>
    {/* Handling sign up  */}
    {loginClicked==='signup' && <form className='form-container' style={{"backgroundColor":"#d1cdce"}}>
      <label htmlFor="username" style={{"fontSize":"1rem"}}>USERNAME</label>
    <input type="text" maxLength={5} id="username" required  style={{"height":"2rem","border":"none","borderBottom":"2px solid green","width":"22rem"}} value={SignUpcredentials.username} placeholder='Enter your username' onChange={handleSIGNUPChange} />

    <label htmlFor="email" style={{"fontSize":"1rem"}}>EMAIL</label>
    <input type="email" id="email" style={{"height":"2rem" ,"border":"none","borderBottom":"2px solid green","width":"22rem"}} value={SignUpcredentials.email} placeholder='Enter your email' onChange={handleSIGNUPChange}/>

    <label htmlFor="password" style={{"fontSize":"1rem"}}>PASSWORD</label>
    <input minLength={8} type="password" id="password" style={{"height":"2rem","border":"none","borderBottom":"2px solid green","width":"22rem"}} value={SignUpcredentials.password} placeholder='Enter your password' onChange={handleSIGNUPChange}/>

    <label htmlFor="confirm_password" style={{"fontSize":"1rem"}}>CONFIRM PASSWORD</label>
    <input minLength={8} type="password" id="confirm_password" style={{"height":"2rem","border":"none","borderBottom":"2px solid green","width":"22rem"}} value={SignUpcredentials.confirm_password} placeholder='Enter your password' onChange={handleSIGNUPChange}/>

    <button className="scaleHover" onClick={SignUpClickAPI} style={{"width":"15rem","height":"3rem","fontWeight":"bold","cursor":"pointer","fontSize": "1rem","color":"white","backgroundColor": "black","borderRadius": "2rem"}}>SIGN UP</button>

    </form>}
{/* handling login up here */}
    {loginClicked==='login' && <form className='form-container' style={{"backgroundColor":"rgb(17 21 21 / 80%)","color": "white"}}>
      <label htmlFor="username" style={{"fontSize":"1rem"}}>USERNAME</label>
    <input type="text" id="username" style={{"height":"2rem","border":"none","borderBottom":"2px solid green","width":"22rem"}} value={loginCredentials.username} placeholder='Enter your username' onChange={handleLOGINChange} />

  
    <label htmlFor="password" style={{"fontSize":"1rem"}}>PASSWORD</label>
    <input type="password" id="password" style={{"height":"2rem","border":"none","borderBottom":"2px solid green","width":"22rem"}} value={loginCredentials.password} placeholder='Enter your password' onChange={handleLOGINChange}/>
    <div></div>
    <button className="scaleHover" onClick={LoginUserAPI} style={{"width":"15rem","height":"3rem","fontWeight":"bold","cursor":"pointer","fontSize": "1rem","backgroundColor": "white","borderRadius": "2rem"}}>LOGIN</button>
    </form>
    
    }
<ToastContainer />

    </div>
    </>
  )
}
