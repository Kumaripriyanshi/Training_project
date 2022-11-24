import React,{useState,useContext} from 'react'
import MainContent from './MainContent'
import NavBar from "./NavBar"
import CarouselComponent from './CarouselComponent'
import Login from './Login'
import BlogMcontext from '../context/BlogsMcontext'
import LoadingBar from 'react-top-loading-bar'





export default function HomePage(props) {
  const context=useContext(BlogMcontext)
  const click=context.click
  const setClick=context.setClick
  // const [click,setClick]=useState(false)
  const barStatus=props.barStatus

  return (
    <>
  {click && <div style={{"zIndex":"1","position":"fixed","width":"100vw","backgroundColor":"rgba(0,0,0,0.7)"}}><Login click={click} setClick={setClick}/> * </div>}
    <NavBar click={click} setClick={setClick}/>
    {/* <LoadingBar
        height={3}
        color='#f11946'
        progress={barStatus} 
        // onLoaderFinished={() => setBarStatus(0)}
        
        /> */}
     <CarouselComponent/>
     <MainContent />
    </>
  )
}
