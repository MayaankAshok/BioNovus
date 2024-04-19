import React, { useState, useEffect } from "react";
import axios from "axios";

function Clear_Data() {
  const [response, setResponse] = useState(null);

  const getResults = async () => {
    try {
      await axios.post("http://localhost:5000/download_report");
    } catch (error) {
      alert('Deleting error ' + error.response.data.error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <h2>Report Downloade</h2>
    </div>
  );
}


export default Clear_Data;
