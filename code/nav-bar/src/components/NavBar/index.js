import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";

function Navbar({ flag }) {
  return (
    <>
      <Nav>
        <NavMenu>
          {flag ? <NavLink to="/home">Home</NavLink> : <NavLink to="/login">Login</NavLink>}
          {/* <NavLink to="/signup">sign up</NavLink> */}
          {flag && <NavLink to="/setting">Settings</NavLink>}
        </NavMenu>
        <Time />
      </Nav>
    </>
  );
}

export default Navbar;
