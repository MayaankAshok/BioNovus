import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Display_S() {
  
  const [samples, setSamples] = useState([]);

  const getSamples = async () => {
      try {
          const response = await axios.get('http://localhost:5000/display_S');
          console.log(response.data);
          setSamples(response.data);
      } catch (error) {
          alert('Error fetching samples:'+ error);
      }
  };

  useEffect(() => {
    getSamples();  // Trigger the GET request when the component mounts
}, []); 

return (
  <div style={{ height: "80vh" }}>
    <h1>Samples</h1>
    <ul>
      {samples.map((sample) => (
        <li key={sample.id}>
          {sample.id}: {sample.type}
        </li>
      ))}
    </ul>
  </div>
);
}

export default Display_S;
