import React, { useState, useEffect } from "react";
import axios from "axios";

function Clear_Data() {
  // State to store the response data
  const [response, setResponse] = useState(null);

  // Function to send a request to clear data
  const getResults = async () => {
    try {
      // Send a POST request to clear data
      await axios.post("http://localhost:5000/clear_data");
    } catch (error) {
      // Alert the user in case of error
      alert('Deleting error ' + error.response.data.error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      {/* Display a message indicating that all data is deleted */}
      <h2>All the data is deleted</h2>
    </div>
  );
}

export default Clear_Data;
