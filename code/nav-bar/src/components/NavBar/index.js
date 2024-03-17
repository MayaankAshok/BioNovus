import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";

function Navbar() {
  const navigate = useNavigate()
  const logout = ()=>{
    window.username = 0;
    window.category = 0;
    //  setFlag(false);
     console.log("log out")
     navigate("/login")
    
  }
  return (
    <>
      <Nav>
        <NavMenu>
          {console.log("flag", window.username )}
          {window.username !== 0 ? <NavLink to="/home">Home</NavLink> : <NavLink to="/login">Login</NavLink>}
          {window.username === 0 && <NavLink to="/signup">Sign Up</NavLink>}
          {window.username !== 0 && <NavLink to="/setting">Settings</NavLink>}
          {/* <NavLink to="/edit_all">edit</NavLink> */}
          {window.username !== 0 && <button onClick={logout}>Logout</button>}
          
        </NavMenu>
        <Time />
      </Nav>
    </>
  );
}

export default Navbar;
