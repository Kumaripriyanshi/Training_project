import React, { useContext, useState, useRef, useEffect } from 'react'
// import pic from "./demo-image.png"
import '../styles/mainContent.css'
import CategoryNavBar from './CategoryNavBar'
import BlogMcontext from '../context/BlogsMcontext'
import {useLocation} from 'react-router-dom'



// import NavBar from './NavBar'

export default function MainContent() {
  const context = useContext(BlogMcontext)
  let popularBlogs = context.popularBlogs;
    const fetchPopularBlogs=context.fetchPopularBlogs
   const [updown,setUpdown]=useState("down")

  const [comments, setComments] = useState([])
  const ref = useRef()
  const ref2 = useRef()
  let path=useLocation()
  const category=context.category
  // const [ide,setId]=useState("")
  const [sending,setSending]=useState([{}])
  const [cmnt,setCmnt]=useState("")
  const userLogged=context.userLogged
  const setClick=context.setClick
const auth_token=context.auth_token


  const data = async (ide) => {
   
    console.log(ide)
    let url = `http://localhost:5000/api/blogs/fetchComments/${ide}`
    const response = await fetch(url, {
      method: "GET"
    })
    // console.log("id =", ref.current.id)
    const json=await response.json()

    // console.log(await response.json())
    return json; 
  }

 const handleinput=(e)=>{
  
   setCmnt(prev=> prev=e.target.value)
  
  const inputArray=document.querySelectorAll('input')
  inputArray.forEach((element)=>{
    // console.log(element)
      if(element.id!==e.target.id){
        document.getElementById(`${element.id}`).value=""
      }
  })
  // e.target.value=cmnt
 }

  const handleCommentChange=async (e)=>{
    // let id=ref.current.id
    // setCmnt(prev=> prev=e.target.value)
    e.preventDefault()
    e.target.innerText="sending ..."
    const BlogId=e.target.id.substring(6)
    const comments=cmnt
    console.log("substring=",e.target.id.substring(6))
    console.log("toe",localStorage.getItem('auth-token'))
    
    const response = await fetch(`http://localhost:5000/api/blogs/addcomment/${BlogId}`, {
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${auth_token}`
        },
        body:JSON.stringify({comments})
      })
      fetchPopularBlogs()
     
    
    e.target.innerText="Send"
    e.target.previousSibling.value=""

  //  setCmnt(prev=>prev="")
  
  
  }

  useEffect(() => {
    let child=document.getElementsByClassName("BlogsContent")[0].childNodes
    // if(child.length>0) child.splice(1,child.length-1)
    
    console.log(child)
    let num=0
    child.forEach((element)=>{
   if(element.type==='fieldset'){num++}
  })
  console.log("yes",num) 
  if(num!==0){
    child.forEach((element,index)=>{
      if(element.type!=='fieldset' && index!==0){
        element.style.display="none"

      }
     })
  }else{
    child.forEach((element,index)=>{
      if(index!==1 && index!==0){
        console.log("elem",element)
        element.style.display="none"
      }else{
        element.style.display="block"

      }
     })
  }
 
  }, [category])
  
  

  const handleDisplay=(e)=>{
    console.log(e.target)
    e.preventDefault()
    if(e.target.nextSibling.style.display==="block"){
      e.target.nextSibling.style.display="none"
      setUpdown(prev=> prev="down")
    }
    else{
      e.target.nextSibling.style.display="block"
      setUpdown(prev=> prev="up")

    }
  }

  return (
    <>
      <div className='container' style={{"flexDirection":"row"}}>
      
        <div className="BlogsContent">
          <CategoryNavBar />
          {popularBlogs.map((b) => {
           
            return  b.category===category ?<fieldset key={b._id}>
             
              <legend style={{"textAlign":"center","borderRadius":"1rem","backgroundColor":"red","fontSize":"2rem"}}>{b.category.toUpperCase()}</legend> 
            {/* <div className='row' > */}
              <div className='Blogtitle'>
                <h3 style={{"textAlign":"center"}}>{b.title} </h3>
                <p style={{"textAlign":"center","marginTop":"5px"}}>By {b.author}, Date: {b.date}</p>
              </div>
              <div className='BlogImage'>
                <img src={b.imageUrl} alt="not found" />
              </div>
              <div className='BlogDesc' style={{"margin":"28px","textAlign":"justify"}}>
                <p>{b.description} </p>
              </div>
             {/* {console.log("bid",b._id)} */}
              <div className='BlogComment' style={{ "width": "100%" }} ref={ref}  >
                <div id={b._id} style={{"cursor":"pointer","backgroundColor": "bisque","fontSize": "larger","fontWeight": "bold","borderRadius": "1rem" }} onClick={handleDisplay}><i className="fa-solid fa-icon-green fa-circle-user" style={{ "fontSize": "1.6rem" }}></i>comments <i className={`${updown==='up'? "fa-solid fa-angle-up":"fa-solid fa-angle-down"}`}></i></div>
                <div className='comments_content' style={{"display":"none"}} ref={ref2} id={`comment${b._id}`} >
                  
                  {b.comments.map((d,indx) => {
                    return <div key={indx}>
                      <span><i className="fa-solid fa-circle-user"></i>{d.author} {d.date}</span>
                     <p>{d.comment}</p>
                    </div>
                  })}
                  
             
                <div className="sendComments" style={{"border":"none","width":"100%"}}>
                <input id={`inp${b._id}`} style={{"width":"41rem","height":"3rem","fontSize":"1rem"}}  onChange={handleinput}  />
                <button id={`button${b._id}`} style={{"width":"24%","marginLeft":"0.5rem","border":"none","cursor":"pointer"}}  onClick={handleCommentChange}>Send</button>
                </div>
                {/* <span style={{ "float": "left", "clear": "both" }} onClick={e=>document.getElementById('send').style.display="block"}>Compose</span> */}
               {/* <div dangerouslySetInnerHTML={{__html:sc}}></div> */}
               </div>
              </div>
          
       
            </fieldset>: <h1 key={b._id} style={{"marginTop":"8rem","zIndex":"1"}}>No Blogs in this category</h1>  })}
        </div>
        <div className='sideContent'>
         <div className='aboutBlog'>
          <div id='titleC'>About- {category} blogs</div>
          <div>The emergence and growth of blogs in the late 1990s coincided with the advent of web publishing tools that facilitated the posting of content by non-technical users who did not have much experience with HTML or computer programming. Previously, a knowledge of such technologies as HTML and File Transfer Protocol had been required to publish content on the Web, and early Web users therefore tended to be hackers and computer enthusiasts. In the 2010s, the majority are interactive Web 2.0 websites, allowing visitors to leave online comments, and it is this interactivity that distinguishes them from other static websites.[2] In that sense, blogging can be seen as a form of social networking service. Indeed, bloggers not only produce content to post on their blogs but also often build social relations with their readers and other bloggers.[3] However, there are high-readership blogs which do not allow comments.</div>
         </div>

         {/* <div className='aboutBlog'>
          <div id='titleC'>Most Viewed {category} Blogs</div>
          <div>Lorem34</div>
         </div> */}
        </div>

      </div>
    </>
  )
}
