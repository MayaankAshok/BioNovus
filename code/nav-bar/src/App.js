import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Settings from "./pages/setting";
import Delete_U from "./pages/delete_U";
import Delete_S from "./pages/delete_S";
import Display_U from "./pages/display_U";
import Display_S from "./pages/display_S";
import Home from "./pages/home";

function App() {

  const [flag, setFlag] = useState(false);

  const updateFlag = (newFlag) => {
    setFlag(newFlag);
  };

  return (
    <Router>
      {/* <Navbar> */}
        <Navbar flag ={flag} /> 
        {/* if flag true then there is a user logged in otherwise not */}
        <Routes>
          {/* <Switch> */}
          <Route path="/signup" element={<Signup/>}>
             
             </Route>

            <Route path="/login" element = {<Login/>}>

            </Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/setting" element={<Settings/>}></Route>
            <Route path="/delete_U" element={<Delete_U/>}></Route>
            <Route path="/delete_S" element={<Delete_S/>}></Route>
            <Route path="/display_U"></Route>
            <Route path="/display_S" element={<Display_S/>}></Route>

          
        </Routes>
        {/* </Navbar> */}
      
    </Router>
  );
}

export default App;
