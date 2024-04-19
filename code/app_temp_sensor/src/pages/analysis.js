import React, { useState, useEffect } from "react";
import axios from "axios";
// IP = 192.168.2.69

function Analysis() {
  const [response, setResponse] = useState(null);

  const getResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/analysis"); // IP for Raspberry Pi on Maitreya's device
      console.log(response.data);
      setResponse(response.data); // Set the response state with the data
    } catch (error) {
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <h1>Analysis</h1>
      {response && (
        <div>
          <table style={{borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}></th>
                <th style={{ padding: "10px", textAlign: "left" }}>Temperature</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Time Stamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", fontSize: "18px" }}>Maximum</td>
                <td style={{ padding: "10px", fontSize: "18px" }}>{response.max_temp}</td>
                <td style={{ padding: "10px", fontSize: "18px" }}>{response.time_max}</td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontSize: "18px" }}>Minimum</td>
                <td style={{ padding: "10px", fontSize: "18px" }}>{response.min_temp}</td>
                <td style={{ padding: "10px", fontSize: "18px" }}>{response.time_min}</td>
              </tr>
            </tbody>
          </table>
          <img src={`data:image/png;base64,${response.image}`} alt="Graph" style={{ marginTop: "20px", maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default Analysis;
