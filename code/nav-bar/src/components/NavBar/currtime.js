
import React from "react";

function Time() {
  const d = new Date();
  const option={hour:'2-digit',minute:'2-digit'};
  const formattedTime = d.toLocaleTimeString(undefined,option);
  
  return <p>{formattedTime}</p>;
}

export default Time;
