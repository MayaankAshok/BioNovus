import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";
import NavItem  from "./NavItem";
function Navbar({ flag }) {
  const navigate = useNavigate()
  const logout = ()=>{
    window.username = 0;
    window.category = 0;
    //  setFlag(false);
    console.log('log out');
    navigate('/login');
  };
  return (
    <>
      <Nav>
        <NavMenu>
          {console.log("flag", flag , window.username )}
          {window.username !== 0 ? <NavLink to="/home"><NavItem name = "Home"></NavItem></NavLink> : <NavLink to="/login"><NavItem name = "Login"></NavItem></NavLink>}
          {window.username === 0 && <NavLink to="/signup"><NavItem name = "Sign Up"></NavItem></NavLink>}
          {window.username !== 0 && <NavLink to="/setting"><NavItem name = "Settings"></NavItem></NavLink>}
          {/* <NavLink to="/edit_all">edit</NavLink> */}
          {window.username !== 0 && <button onClick={logout}>Logout</button>}
        </NavMenu>
        <Time />
      </Nav>
    </>
  );
}

export default Navbar;
