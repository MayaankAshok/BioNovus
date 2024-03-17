import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Delete_S() {
  // let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go
  // const [submittedValues, setSubmittedValues] = useState({});
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
  const deleteSample = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete_S/${id}`);
      // After deletion, fetch the updated sample list
      getSamples();
    } catch (error) {
      console.error('Error deleting sample:', error);
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <h1>Samples</h1>
      <ul>
        {samples.map((sample) => (
          <li key={sample.id}>
            {sample.id}: {sample.role}
            <button onClick={() => deleteSample(sample.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delete_S;
