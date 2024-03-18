import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function ListItem({link, name }) {
    return <div style={{color:"#09db33", background : "#0a1a04",paddingLeft: "20px", paddingRight: "20px", height :"40px",
    justifyContent:"center", textAlign:"center", verticalAlign:"middle", lineHeight:"40px",
    fontFamily:"consolas", fontSize:"20px",
    display : "inline-block", margin:"10px",  
    clipPath: "polygon( 15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)"}}>
        <Link style={{color:"#09db33", textDecoration:"None"}} to={link}>{name} </Link>

    </div> 
}

export default ListItem