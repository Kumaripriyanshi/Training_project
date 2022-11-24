import React ,{useContext} from 'react'
import {Link} from 'react-router-dom'
import '../styles/categoryNav.css'
import BlogMcontext from '../context/BlogsMcontext'

export default function CategoryNavBar() {
  let context=useContext(BlogMcontext)
  const setCategory=context.setCategory
  const handleCategoryClick=(e)=>{
        setCategory(prev=> prev=e.target.id)

        document.querySelectorAll(".link_btn").forEach(element => {
          if(e.target.id===element.id){
            element.style.backgroundColor="red"
          }else{
            element.style.backgroundColor="#1d1d0d"
          }
        });

        console.log(document.querySelectorAll(".link_btn"))
  }

  return (
    <nav id="categoryNav">
    <ul style={{"width":"100%"}}>
        <li ><button className="link_btn categoryLinks" id="all" style={{'backgroundColor':"red","marginLeft":"0px"}} onClick={handleCategoryClick}>All</button></li>
        <li ><button className="link_btn categoryLinks" id="travel" onClick={handleCategoryClick}>Travel</button></li>
        <li><button className="link_btn categoryLinks" id="food" onClick={handleCategoryClick}>Food</button></li>
        <li><button className="link_btn categoryLinks" id="fitness" onClick={handleCategoryClick}>Fitness</button></li>
        <li><button className="link_btn categoryLinks" id="entertainment" onClick={handleCategoryClick}>Entertainment</button></li>

    </ul>
   </nav>
  )
}
