import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom"
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import ShowBlogs from "./components/ShowBlogs";
import SignUp from "./components/SignUp";
// import UploadsImage from "./components/UploadsImage";
import WriteBlogs from "./components/WriteBlogs";
import BlogState from "./context/BlogState";
import LoadingBar from 'react-top-loading-bar'

import BlogMcontext from './context/BlogsMcontext'
import { useContext,useState } from "react";







function App() {
  const [barStatus,setBarStatus]=useState(0);
  const context=useContext(BlogMcontext)
  // const barStatus=context.barStatus
  // const path=useLocation()
 
  return (
   <div>
    <LoadingBar
        height={3}
        color='#f11946'
        progress={barStatus} 
        onLoaderFinished={() => setBarStatus(0)}
        
        />
   <BlogState>
   <Router>
   <Routes>
   <Route exact path="/" element={<HomePage key="HomePage" barStatus={barStatus} />}></Route>
   
   <Route exact path="/write" element={<WriteBlogs key="WriteBlogs" barStatus={barStatus} setBarStatus={setBarStatus}  />}></Route>
   <Route exact path="/showmyBlogs" element={<ShowBlogs key="ShowBlogs" barStatus={barStatus} setBarStatus={setBarStatus} />}></Route>
   {/* <Route exact path="/signup" element={<SignUp key="SignUp" />}></Route>
   <Route exact path="/login" element={<Login key="Login" />}></Route> */}

   </Routes>
   </Router>
   </BlogState>
   {/* <UploadsImage/> */}
   </div>
  );
}

export default App;
