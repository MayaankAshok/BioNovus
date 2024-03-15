import React from "react";
import { Link,useNavigate } from "react-router-dom";

function Home(){

  const navigate = useNavigate()
  
  const HandleStartTest = e => {
    navigate("/start_test")
  }

    return(
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}>
            <button onClick={() => HandleStartTest()}>Test start</button>

        </div>
    );
}

export default Home;