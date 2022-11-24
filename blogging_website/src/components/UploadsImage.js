import React,{useState,useEffect,useContext} from 'react'
import pic from "./demo-image.png"
import axios from 'axios'
import BlogMcontext from '../context/BlogsMcontext';

export default function UploadsImage(props) {
  const [images,setImages]=useState([]);
  const[imageUrls,setImageURLS]=useState([]);
  const context=useContext(BlogMcontext)
  const setTitleDesc=context.setTitleDesc
  const blogTitleDesc=context.blogTitleDesc
  const handleOnchange=context.handleOnchange
  const [trigger,setrigger]=useState(false)
  const blogRedirect=context.blogRedirect

function onChan(e){
            setImages([e.target.files[0]]);  
            let label=document.getElementById('label')
            // label.style.display='none'
            setrigger(prev=> prev=true)
            console.log("changing ===...")
}

const uploadimageDatabas=async(originalname)=>{
  console.log("orig",originalname)
  const formData= new FormData()
  formData.append('image',images[0])
  const response=await axios.post("http://localhost:5000/api/blogs/uploadImage",formData)
  //  const response=await fetch ("http://localhost:5000/api/blogs/uploadImage",formData,{
  //   method:"POST"
  //  })

  //  const json=await response.json()

   console.log(response.img)
   setTitleDesc({...blogTitleDesc,["imageUrl"]:response.img})
           

}
          
useEffect(()=>{
          
            const newUl=[]
            if(images.length>0){
              console.log("llll",images[0].name)
              uploadimageDatabas(images[0].name)

            }
            
            images.forEach(image=>newUl.push(URL.createObjectURL(image)));
            console.log("url=",newUl)
            setImageURLS(newUl)  
    },[images]);
    
useEffect(()=>{
if(!blogRedirect){
  setImageURLS(prev=> prev=[])
}
},[blogRedirect])

  return (
   <>
   
   <input type="file" multiple accept="image/*" id="imges" onChange={onChan} />
    <label htmlFor="imges" id='label' >{blogRedirect && !trigger?<img src={props.url} alt="not found" style={{"width":"44rem","height":"26rem"}}/>:(imageUrls.length>0?imageUrls.map((g)=>{
    return <img key={g} src={g} alt="not found" style={{"width":"44rem","height":"26rem"}}/>}):<img src='https://flyclipart.com/thumb2/easy-cartoon-wechat-end-icon-camera-easy-icon-with-png-and-vector-604653.png' alt="not found" style={{"width":"44rem","height":"26rem","opacity":"0.8"}}/>)}</label> 
   {/* <img  src={pic} alt="not found"/> */}
   {/* {props.url?<img src={props.url} alt="not found" style={{"width":"44rem","height":"26rem"}}/>:imageUrls.map((g)=>{
    return <img key={g} src={g} alt="not found" style={{"width":"44rem","height":"26rem"}}/>
    })} */}
  
   </>
  )
}