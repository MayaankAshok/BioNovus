import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavElements";
import Time from "./currtime";
import NavItem  from "./NavItem";
import Clear_Data from "../../pages/clear_data";
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
          
          {(<NavLink to="/clear_data"><NavItem name="Clear Data" /></NavLink>)}
          {(<NavLink to="/set_record"><NavItem name="Set Record" /></NavLink>)}
          {(<NavLink to="/download_result"><NavItem name="Download Results" /></NavLink>)}
          {(<NavLink to="/temp_limit"><NavItem name="Temp Limit" /></NavLink>)}

      
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
