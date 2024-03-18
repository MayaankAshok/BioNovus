import React, { useState, useEffect } from 'react';

function Time() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

   
    return () => clearInterval(intervalId);
  }, []);

  function getCurrentTime() {
    const d = new Date();
    const option = { hour: '2-digit', minute: '2-digit' };
    return d.toLocaleTimeString(undefined, option);
  }

  return <p style={{color:"#09db33"}}>{currentTime}</p>;
}

export default Time;
