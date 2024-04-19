import React, { useState, useEffect } from 'react';
import TimeItem  from "./TimeItem";

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

  return <TimeItem name={currentTime} ></TimeItem>;
}

export default Time;
