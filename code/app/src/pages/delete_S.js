import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
import './button.css';
import NavItem from '../components/NavBar/NavItem';

function Delete_S() {
  // const [submittedValues, setSubmittedValues] = useState({});
  const [samples, setSamples] = useState([]);

  const getSamples = async () => {
    try {
      const response = await axios.get('http://localhost:5000/display_S');
      const sortedSamples = response.data.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log(sortedSamples);
      setSamples(sortedSamples);
    } catch (error) {
      alert('Error fetching samples:' + error);
    }
  };

  useEffect(() => {
    getSamples(); // Trigger the GET request when the component mounts
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
    <div
      style={{
        height: '80vh',
      }}
    >
      <h2>Select Samples to Delete</h2>
      <ul>
        {samples.map((sample) => (
          <li className="list" key={sample.id}>
            {sample.id}: {sample.type}, {sample.u_name}
            <button className="button1" onClick={() => deleteSample(sample.id)}>
              <NavItem name="Delete"></NavItem>
            </button>
          </li> // Added closing </li> tag here
        ))}
      </ul>
    </div>
  );
}

export default Delete_S;
