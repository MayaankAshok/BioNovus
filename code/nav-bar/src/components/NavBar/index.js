import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";

function Navbar({ flag }) {
  return (
    <>
      <Nav>
        <NavMenu>
          {flag ? <NavLink to="/home">Home</NavLink> : <NavLink to="/login">Login</NavLink>}
          {!flag && <NavLink to="/signup">Sign Up</NavLink>}
          {flag && <NavLink to="/setting">Settings</NavLink>}
          {/* <NavLink to="/edit_all">edit</NavLink> */}
        </NavMenu>
        <Time />
      </Nav>
    </>
  );
}

export default Navbar;
