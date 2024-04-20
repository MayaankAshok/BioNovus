import React, { useState, useEffect } from "react";
import axios from "axios";

function Analysis() {
  // State to store the response data
  const [response, setResponse] = useState(null);

  // Function to fetch analysis results from the server
  const getResults = async () => {
    try {
      // Make a GET request to the server
      const response = await axios.get("http://" + window.PI_IP + ":5000/analysis");
      // Log the response data to console
      console.log(response.data); 
      // Set the response state with the data
      setResponse(response.data);
    } catch (error) {
      // Alert the user in case of error
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getResults();
  }, []);

 
  const styles = {
    container: {
      height: "80vh",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
      margin: "auto",
    },
    cell: {
      padding: "10px",
      fontSize: "18px",
      textAlign: "left",
    },
    image: {
      marginTop: "20px",
      maxWidth: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Analysis</h1>
      {response && (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cell}>Statistic</th>
                <th style={styles.cell}>Temperature</th>
                <th style={styles.cell}>Time Stamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.cell}>Maximum</td>
                <td style={styles.cell}>{response.max_temp}</td>
                <td style={styles.cell}>{response.time_max}</td>
              </tr>
              <tr>
                <td style={styles.cell}>Minimum</td>
                <td style={styles.cell}>{response.min_temp}</td>
                <td style={styles.cell}>{response.time_min}</td>
              </tr>
            </tbody>
          </table>
          <img src={`data:image/png;base64,${response.image}`} alt="Graph" style={styles.image} />
        </div>
      )}
    </div>
  );
}

export default Analysis;
