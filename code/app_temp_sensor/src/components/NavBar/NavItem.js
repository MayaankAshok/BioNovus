import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function NavItem({name}) {
    return <div style={{color:"white", background : "#0a1a04",paddingLeft: "15px", paddingRight: "15px", height :"40px",
     justifyContent:"center", textAlign:"center", verticalAlign:"middle", lineHeight:"40px",
     fontFamily:"consolas", fontSize:"20px",
     clipPath: "polygon( 15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)"}}>
        {name}
    </div>
}



export default NavItem
