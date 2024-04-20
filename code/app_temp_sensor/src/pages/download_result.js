import React, { useState, useEffect } from "react";
import axios from "axios";

function Clear_Data() {
  // State to store the response data
  const [response, setResponse] = useState(null);

  // Function to send a request to download the report
  const getResults = async () => {
    try {
      // Send a POST request to download the report
      await axios.post("http://" + window.PI_IP + ":5000/download_report");
    } catch (error) {
      // Alert the user in case of error
      alert('Downloading error ' + error.response.data.error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      {/* Display a message indicating that the report is downloaded */}
      <h2>Report Downloaded</h2>
    </div>
  );
}

export default Clear_Data;
