import React,{useState} from 'react'

export default function SignUp() {
    const [SignUpcredentials ,setSignUpcredentials]=useState({username:"",email:"",password:"",confirm_password:""})
   

    const handleChange=(e)=>{
          setSignUpcredentials({...SignUpcredentials,[e.target.id]:e.target.value})
    }
  
    const CreateUserAPI=async ()=>{
      let url="http://localhost:5000/api/auth/createUser"
      const {username,email,password,confirm_password}=SignUpcredentials


      const response=await fetch(url,{
          method:"POST",
          headers:{
          "Content-Type":"application/json"},
          body:JSON.stringify({username,email,password,confirm_password})
      }
      )

      const json=await response.json()
      // localStorage.setItem("auth-token",json)
    }

  return (
    <>
    <form>
    <input type="text" id="username" value={SignUpcredentials.username} placeholder='Enter your username' onChange={handleChange} />
    <input type="email" id="email" value={SignUpcredentials.email} placeholder='Enter your email' onChange={handleChange}/>
    <input type="password" id="password" value={SignUpcredentials.password} placeholder='Enter your password' onChange={handleChange}/>
    <input type="password" id="confirm_password" value={SignUpcredentials.confirm_password} placeholder='confirm your password' onChange={handleChange}/>
    <input type="button" value="Submit" onClick={CreateUserAPI}/>
    </form>
    
    </>
  )
}
