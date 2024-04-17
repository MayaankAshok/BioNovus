import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";
import NavItem  from "./NavItem";
function Navbar({ }) {
  const navigate = useNavigate()
  return (
    <>
      <Time />
      <Nav>
        <NavMenu>
          {/* {console.log("flag", flag , window.username )} */}
          {(<NavLink to="/home"><NavItem name="Home" /></NavLink>) }
          {(<NavLink to="/analysis"><NavItem name="Analysis" /></NavLink>)}
          {/* {window.username === 0 && <NavLink to="/signup"><NavItem name = "Home"></NavItem></NavLink>}
          {window.username !== 0 && <NavLink to="/setting"><NavItem name = "Settings"></NavItem></NavLink>} */}
          {/* <NavLink to="/edit_all">edit</NavLink> */}
          {/* {window.username !== 0 && <button style={{backgroundColor: "transparent",border:"None"}} onClick={logout}><NavItem name="Logout"></NavItem>  </button>} */}
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
