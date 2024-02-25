import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavElements";
import Time from "./currtime";

function Navbar() {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/login">login</NavLink>
          <NavLink to="/signup">sign up</NavLink>
          
        </NavMenu>
        <Time />
      </Nav>
    </>
  );
}

export default Navbar;
