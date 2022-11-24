import React,{useContext,useEffect,useState} from 'react'
import UploadsImage from "./UploadsImage"
import BlogMcontext from '../context/BlogsMcontext'
import '../styles/writeBlog.css'
import LoadingBar from 'react-top-loading-bar'
import Login from './Login'
import {useLocation,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function WriteBlogs(props) {
 const context = useContext(BlogMcontext)
 const {json,blogTitleDesc,setTitleDesc ,handleOnchange,popularBlogs,border,blogRedirect,setblogRedirect,updateTitielDesc,setupdateTitielDesc}=context
 const {title,description,imageUrl}=blogTitleDesc
// const [barStatus,setBarStatus]=useState(0);
const setBarStatus=props.setBarStatus
const userLogged=context.userLogged
const click=context.click
  const setClick=context.setClick
  const [category,setCategory]=useState("")
  const auth_token=context.auth_token
  const navigate=useNavigate()
  const fetchUserData=context.fetchUserData


const addNewBlogs = async () => {
    let url = "http://localhost:5000/api/blogs/addBlogs"
    console.log(title,description)
   
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${auth_token}`
        },
        body: JSON.stringify({ title,description,imageUrl,category })
      })
  
      const json = await response.json()

      console.log("Here is the response", json)
      setblogRedirect(false)
      console.log(json)
      await fetchUserData()
     if(json.title){
      toast('Added Successfully!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style:{
          "backgroundColor":"green",
          "color":"white"
        }
        });}else{
          toast('Please fill it again', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style:{
              "backgroundColor":"red",
              "color":"white"
            }
            });
        }
        
  
    

  }

const handleClick = () => {
  
    auth_token?addNewBlogs():setClick(prev=> prev=true)
    console.log("auth_token",auth_token)
    // document.getElementById('loginPlace').innerHTML=
    setTitleDesc(({title:"",description:"",imageUrl:""}))
    setCategory(prev=> prev="")
// console.log(category)
  }

useEffect(() => {
// setBarStatus(0)
// setBarStatus(10)
setBarStatus(20)
setBarStatus(70)
setBarStatus(100)
// setBarStatus(0)
console.log("running")

// setblogRedirect(false)
if(blogRedirect) {blogTitleDesc.title=updateTitielDesc.title
  blogTitleDesc.description=updateTitielDesc.description
  const text=updateTitielDesc.category.substring(1,updateTitielDesc.category.length-1).toLowerCase()
  setCategory(prev=> prev=text)
  // console.log("category")
}

},[])

const updateAPIcall=async()=>{
  console.log("id=jj",updateTitielDesc.id)
  // title=blogTitleDesc.title
  // description=blogTitleDesc.description
  console.log(title)

  let url=`http://localhost:5000/api/blogs/updateBlog/${updateTitielDesc.id}`
  if(auth_token){
    const response=await fetch(url,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":`${auth_token}`
      },
      body:JSON.stringify({title,description,imageUrl,category})
    })
  setblogRedirect(false)
  blogTitleDesc.title=""
  blogTitleDesc.description=""
  setCategory(prev=> prev="")

  toast('updated Successfully!!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style:{
      "backgroundColor":"green",
      "color":"white"
    }
    });
    fetchUserData()

  }
  
// console.log(category)

}
useEffect(() => {
  // if(document.getElementsByClassName('categorybtn')){
  
  document.getElementsByClassName('Category_container')[0].childNodes.forEach((element)=>{
    if(element.innerText.toLowerCase()===category){
      element.style.backgroundColor="pink"
    }else{
      element.style.backgroundColor="rgba(0,0, 0, 0.6)"
    }
  })

}, [category])

const handleCategoryClick= (e)=>{
  // e.target.style.backgroundColor="pink"
  const text=e.target.innerText.toLowerCase()
  setCategory(prev=> prev=text)
  console.log("ne",category)
  // updateTitielDesc.category="("+text+")"
}

const handleHover=(e)=>{
  if(e.target.style.backgroundColor!=="pink")
      e.target.style.backgroundColor='rgba(0,0, 0, 0.4)'
}

const handleOut=(e)=>{
  if(e.target.style.backgroundColor!=="pink")
     e.target.style.backgroundColor='rgba(0,0, 0, 0.6)'
}
// const [barStatus,setBarStatus]=useState(0);
  return (

    <div style={{"display":"flex","justifyContent":"space-around"}}>
  
     {/* <LoadingBar
        height={3}
        color='#f11946'
        progress={props.barStatus} 
        // onLoaderFinished={() => setBarStatus(0)}
        
        /> */}
      <div className='container'>
        <h1 id="addNew" onMouseEnter={e=>e.target.innerText="Home"}onMouseLeave={e=> e.target.innerText="Add new Blogs"} onClick={e=>navigate('/')}>Add new Blogs</h1>
      <div className='Category_container'>
       
        <button className='categorybtn' onMouseOver={handleHover} onMouseOut={handleOut} onClick={handleCategoryClick}>All</button>
      <button  className='categorybtn' onMouseOver={handleHover} onMouseOut={handleOut} onClick={handleCategoryClick}>Travel</button>
      <button  className='categorybtn' onMouseOver={handleHover} onMouseOut={handleOut} onClick={handleCategoryClick}>Food</button>
      <button  className='categorybtn' onMouseOver={handleHover} onMouseOut={handleOut} onClick={handleCategoryClick}>Fitness</button>
      <button className='categorybtn' onMouseOver={handleHover} onMouseOut={handleOut} style={{"marginRight":"0px"}} onClick={handleCategoryClick}>Entertainment</button>
          </div>
        <div className='imageCont'>
          
         {blogRedirect?<UploadsImage url={`${updateTitielDesc.imageUrl}`} />:<UploadsImage/>}
        </div>
        <div className='titleClss' style={{"marginTop":"2rem"}}>
          <label htmlFor='title' style={{"display":"block","fontSize":"2rem"}} >Title</label><br />
          <input type="text"  className="input" value={blogTitleDesc.title} id="title" required  placeholder="Enter the title of your blog " onChange={handleOnchange}  />
        </div>

        <div className='desc' style={{"marginTop":"4rem"}}>
        <label htmlFor='description' style={{"display":"block","fontSize":"2rem"}} >Description</label><br />
        <textarea className="input" required value={blogTitleDesc.description} id="description"  placeholder="Enter the description of your blog "rows={7} cols={20}  onChange={handleOnchange}></textarea>
          {/* <input type="text" className="input" value={blogTitleDesc.description} id="description" placeholder="Enter the description of your blog " onChange={handleOnchange} /> */}
        </div>

        <div className='addBlogBtn'>
          {blogRedirect?<button onClick={updateAPIcall} >UPDATE</button>:<button onClick={handleClick}>ADD</button>}
        </div>
<div id="loginPlace" style={{"zIndex":"1","position":"fixed","width":"100vw","top":"0px","left":"0px","backgroundColor":"rgba(0,0,0,0.7)"}}>
      {click && <Login click={click} setClick={setClick}/>}
  
   </div>
   <ToastContainer />

      </div>
   <div className='sideContent'>
    <img style={{"display":"block","width":"100%","height":"100%"}} src="https://png.pngtree.com/png-vector/20220127/ourlarge/pngtree-web-site-department-programmers-and-art-department-create-a-company-website-png-image_4370328.png" alt="not found" />
   </div>
    </div>
  )
}
