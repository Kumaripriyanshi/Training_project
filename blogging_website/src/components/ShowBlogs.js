import React, { useContext,useRef,useState,useEffect } from 'react'
import BlogMcontext from "../context/BlogsMcontext"
import Modal from './Modal'
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import pic from './showBlog.png'


export default function ShowBlogs(props) {

    const context = useContext(BlogMcontext)
    const  blogs  = context.json
    const setblogRedirect=context.setblogRedirect
    const setupdateTitielDesc=context.setupdateTitielDesc
    const updateTitielDesc=context.updateTitielDesc
    const auth_token=context.auth_token
    const fetchUserData=context.fetchUserData
useEffect(()=>{
props.setBarStatus(10)
props.setBarStatus(20)
props.setBarStatus(70)
props.setBarStatus(100)

},[])
    
    const [comments, setComments] = useState([])
    const ref = useRef()
    const ref2 = useRef()
    const mainRef = useRef()
    const[Title,setTitle]=useState("")
  

    const btnRef=useRef()
    const navigate=useNavigate()
  
    // const data = async (e) => {
    //   // let url = `http://localhost:5000/api/blogs/fetchComments/${ref.current.id}`
    //   const di=e.target.parentNode.id
    //   console.log("di=",di)
    //   let url = `http://localhost:5000/api/blogs/fetchComments/${di}`
    // if(auth_token){
    //   const response = await fetch(url, {
    //     method: "GET"
    //   })
    //   console.log("id =", ref.current.id)
    //   setComments(await response.json())
    //   console.log(comments)
    // }
      
    // }


   
const deleteAPIcall=async(id)=>{
    let url=`http://localhost:5000/api/blogs/deleteBlog/${id}`
   
      const response=await fetch(url,{
        method:"DELETE",
        headers:{
            "auth-token":`${auth_token}`
        }
      })
      fetchUserData()

}


    const handle_deleteBtn=(e)=>{
      const parent=e.target.parentNode.parentNode
      deleteAPIcall(parent.id)
    }

    const handle_updateBtn= (e)=>{
      const id=e.target.parentNode.parentNode
      console.log("parent=",id.childNodes[1].childNodes[0].innerText)
      setupdateTitielDesc(prev=> prev={title:id.childNodes[1].childNodes[0].innerText,description:id.childNodes[3].childNodes[0].innerText,id:id.id,category:id.childNodes[0].innerText,imageUrl:id.childNodes[2].childNodes[0].getAttribute("src")} )
      
      console.log(updateTitielDesc.title,updateTitielDesc.description,updateTitielDesc.id)
      navigate('/write')
      setblogRedirect(true)
    }

    return (
        <div className="showBlogsC">
    {/* <NavBar/> */}
    <img src={pic} style={{"position":"absolute","width":"50rem","top":"5rem"}}/>
            <div className='container' style={{"justifyContent":"center","alignItems":"center"}}>
        <div className="BlogsContent">
          <h1 id="h" style={{"position":"relative","textAlign":"center","fontSize":"5rem","backgroundColor":"#696bb3","width":"57rem","borderRadius":"5rem"}}>My Blogs
          <div className='navDiv' tooltip="home"  onClick={e=> navigate('/')}>Home</div>
          <div className='navDiv' style={{"right":"0"}} onClick={e=> navigate('/write')}>Compose</div>
          </h1>
          {blogs.length>0?blogs.map((b) => {
            return <fieldset ref={mainRef} key={b._id} id={b._id} style={{"color":"white",'zIndex':"1","backgroundColor":"black"}}>
            <legend style={{"textAlign":"center","borderRadius":"1rem","backgroundColor":"red","fontSize":"2rem"}}>{b.category.toUpperCase()}</legend> 
              <div className='Blogtitle'>
                <h2 style={{"textAlign":"center"}}>{b.title}</h2>
                <p style={{"textAlign":"center"}}>{b.author}, {b.date}</p>
              </div>
              <div className='BlogImage'>
                <img src={b.imageUrl} alt="not found" />
              </div>
              <div className='BlogDesc' style={{"margin":"28px","textAlign":"justify"}}>
                <p>{b.description} </p>
              </div>
             
              {/* <div className='BlogComment' style={{ "width": "100%" }} ref={ref} id={b._id} onClick={data} > */}
              <div className='BlogComment' style={{ "width": "100%" }}>

                <div style={{ "float": "left", "clear": "both","backgroundColor": "bisque","fontSize": "larger","fontWeight": "bold","borderRadius": "1rem",'color':"black"}}><i className="fa-solid fa-icon-green fa-circle-user" style={{ "fontSize": "1.6rem"}}></i>comments</div>
                <div className='comments_content' ref={ref2} id={`comment${b._id}`} style={{ "float": "left", "margin": "21px 0px 14px 0px" }}>

                {b.comments.length>0 ?b.comments.map((d,indx) => {
                    return <div key={indx}>
                      <span style={{"color":"white"}}><i className="fa-solid fa-circle-user"></i> {d.author} {d.date}</span>
                     <p>{d.comment}</p>
                    </div>
                  }):<p style={{"color":"white"}}>No Comments!!</p>}

                </div>
           
              </div>
              {/* <button id={b._id} ref={btnRef} onClick={handle_updateBtn}>update</button> */}
              <div className='updDelBtn' style={{"display":"flex","width":"25rem","height":"3rem","justifyContent":"center","marginBottom":"1rem"}}>
              <button ref={btnRef} style={{"borderRadius":"2rem","fontWeight":"bold","width":"15rem","border":"none","cursor":"pointer","backgroundColor":"white","marginRight":"1rem"}} onClick={handle_updateBtn}>UPDATE</button>
              <button style={{"borderRadius":"2rem","fontWeight":"bold","width":"15rem","border":"none","cursor":"pointer","backgroundColor":"white"}} onClick={handle_deleteBtn}>DELETE</button>
              </div>

            </fieldset>
          }):<h1 style={{"marginTop":"8rem","zIndex":"1"}}>You haven't composed any blogs</h1>}
        </div>
      </div> 
            
        </div>
    )
}
