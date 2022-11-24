import React,{useContext,useEffect} from 'react'
import {Link} from "react-router-dom"
import '../styles/NavBar.style.css'
import BlogMcontext from '../context/BlogsMcontext'



export default function NavBar(props) {
  const context=useContext(BlogMcontext)
  const username=context.username
  const setUsername=context.setUsername
  const userLogged=context.userLogged
  const setuserLogged=context.setuserLogged
const auth_token=context.auth_token
const setAuthToken=context.setAuthToken
  useEffect(() => {
   
    localStorage.getItem('auth-token')?setuserLogged(true):setuserLogged(false)
    console.log("authToken=",auth_token)
      setAuthToken(prev=> prev=localStorage.getItem('auth-token'))
    async function usernamefetch(){
      if(auth_token){
        const response=await fetch("http://localhost:5000/api/blogs/getusername",{
          method: "GET",
          headers: {
           "Content-Type": "application/json",
              "auth-token": `${auth_token}`
          }
         })
         const json=await response.json()
         setUsername(prev=> prev=json)
      }
     
   }

    if(auth_token){
      console.log("fetching user name")
      usernamefetch()
    }
    
    }, [auth_token])
 
  const handleClick=()=>{
      props.setClick(prev=> prev=true)
      console.log(props.click)
      // document.getElementById('nav').style.zIndex="0";
  }

const spanStyle={'zIndex': '1',
  'position': 'absolute',
  'top': '65px',
  'display': 'none',
 'backgroundColor': 'gray',
  'width': '6rem',
  /* height: 3rem; */
  /* padding: 1rem; */
  'textAlign': 'center',
  "border":"2px solid white",
  'color': 'black',
  'fontWeight':"bold",
  'cursor':"pointer",
  'boxSizing': 'border-box'}

  const handleSignOut=(e)=>{
     console.log(e.target.nextSibling)
     if(e.target.nextSibling.style.display==="none"){
      e.target.nextSibling.style.display="block"
     }else{
      e.target.nextSibling.style.display="none"
     }
    }

  const logOut=()=>{
    localStorage.clear();
    setuserLogged(prev=> prev=false)
    setAuthToken(prev=> prev="")
    setUsername(prev=> prev="")
  }
  return (
  <>
 
   <nav id="nav">
    {console.log(username)}
    <div className='logo'>
      <img src="" alt="Logo not found"/>
    </div>
    <div className='links'>
      <ul>
        <li  className="hoverLinks"><Link to='/' style={{"color":"white","fontSize":"1.2rem"}}>HOME</Link></li>
        <li className="hoverLinks"><Link to='/write' style={{"color":"white","fontSize":"1.2rem"}}>COMPOSE</Link></li>
        {/* <li><Link to='/popularBlogs'>POPULAR BLOGS</Link></li> */}
        <li className="hoverLinks"><Link to='/showmyBlogs' style={{"color":"white","fontSize":"1.2rem"}}>MY BLOGS</Link></li>
      </ul>
    </div>
    <div className='LoginSignUp'>
    {/* <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={handleClick}>Login</Link>
    <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link> */}
    {userLogged?<div style={{"display":"flex","flexDirection":"column","cursor":"pointer"}}>
    <p onClick={handleSignOut} style={{"width": "10rem",
    "margin": '-8px',
    "textAlign": "center",
    "backgroundColor": "rgba(255,255,255,0.2)"}}>Welcome {username}</p>
    <span style={spanStyle} onClick={logOut}>Log Out</span>
    </div>:<button className='loginsbtn'  onClick={handleClick}>Login/signUp</button>}
  
    </div>
   </nav>
   </> 
  )
}
