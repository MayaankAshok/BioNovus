import React from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";

function app() {
  return (
    <Router>
      {/* <Navbar> */}
        <Navbar/>
        <Routes>
          {/* <Switch> */}
          <Route path="/signup" element={<Signup/>}>
             
             </Route>

            <Route path="/login" element = {<Login/>}>

            </Route>

          
        </Routes>
        {/* </Navbar> */}
      
    </Router>
  );
}

export default app;
