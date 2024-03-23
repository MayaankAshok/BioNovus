import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function TimeItem({name}) {
    return <div style={{position: "absolute", left:"50%"}}>
        <div style={{color:"white", background : "#0a1a04",paddingLeft: "20px", paddingRight: "20px", height :"40px",
        position:"relative",top:"-20px", left:"-50%",
        justifyContent:"center", textAlign:"center", verticalAlign:"middle", lineHeight:"60px",
        fontFamily:"consolas", fontSize:"10px",
        clipPath: "polygon( 15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)"}}>
            {name}
        </div>
    </div>
}

export default TimeItem