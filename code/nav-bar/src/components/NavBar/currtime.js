
import React from "react";

function Time() {
  const d = new Date();
  const formattedTime = d.toLocaleTimeString(); 
  return <p>{formattedTime}</p>;
}

export default Time;
