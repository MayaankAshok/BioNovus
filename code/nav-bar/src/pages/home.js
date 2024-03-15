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
<<<<<<< HEAD
            <h3>Test start</h3>
            {/* <h3>{window.username}</h3> */}
            {/* <h3>{window.category}</h3> */}
=======
            <button onClick={() => HandleStartTest()}>Test start</button>

>>>>>>> dea5942bb395a886c73370f905b9920ef6e95440
        </div>
    );
}

export default Home;