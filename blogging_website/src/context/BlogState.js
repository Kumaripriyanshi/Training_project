import React, { useEffect,useState} from 'react'
import BlogMcontext from './BlogsMcontext'

export default function BlogState(props) {
    const [border,setBorder]=useState("")
    const [blogRedirect,setblogRedirect]=useState(false)
    const [category,setCategory]=useState('all')
    const [userLogged,setuserLogged]=useState(false)
     const [click,setClick]=useState(false)
     const [state,setState]=useState('/')
     const [username,setUsername]=useState("")
     const [auth_token,setAuthToken]=useState("")
const [barStatus,setBarStatus]=useState(0);

     



    // const [barStatus,setBarStatus]=useState(0);
    const handleOnchange=(e)=>{
        if(e.target.value.length<8){
            e.target.style.border="2px solid red"
        }else{
            e.target.style.border="2px solid green"
        }
        setTitleDesc({...blogTitleDesc,[e.target.id]:e.target.value})
        // e.target.value<8?setBorder("2px solid red"):setBorder("2px solid green")
      
  }
    const [json,setJSON]=useState([])
    const [popularBlogs,setpopularBlogs]=useState([])

    const [blogTitleDesc,setTitleDesc]=useState({title:"",description:"",imageUrl:""})
    const [updateTitielDesc,setupdateTitielDesc]=useState({title:"",description:"",id:"",category:"",imageUrl:""})

    const fetchUserData = async () => {
        let url = "http://localhost:5000/api/blogs/getalluserSpecificBlogs"
        // const auth_token=localStorage.getItem('auth-token')

        if(auth_token){

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${auth_token}`
                }
    
            })
            const ans=await response.json()
            
            setJSON(prev=> prev=ans)
        }

       
    console.log('jason=',json)
    }

    const fetchPopularBlogs = async () => {
        let url = "http://localhost:5000/api/blogs/getallblogs"
        // const auth_token=localStorage.getItem('auth-token')

        if(auth_token){

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${auth_token}`
                }
    
            })
           
            setpopularBlogs(await response.json())
        }

       
        
    }
    useEffect(() => {
        console.log("hye there")
        if(auth_token){
            fetchUserData()
            fetchPopularBlogs()
        }else{
            setJSON(prev=>prev=[])
            setpopularBlogs(prev=>prev=[])
        }
    },[auth_token])
    
const childProps={json,blogTitleDesc,
    setTitleDesc,handleOnchange,
    popularBlogs,border,blogRedirect,
    setblogRedirect,updateTitielDesc,
    setupdateTitielDesc,category,
    setCategory,userLogged,
    setuserLogged,click,
    setClick,username,setUsername,fetchUserData,
    auth_token,setAuthToken,fetchPopularBlogs
    // barStatus,setBarStatus
}

    return (
        <BlogMcontext.Provider value={childProps}>{props.children}</BlogMcontext.Provider>
    )
}

