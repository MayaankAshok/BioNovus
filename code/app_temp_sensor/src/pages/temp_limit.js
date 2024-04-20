import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Time_Interval() {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    temp_limit: ''
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form data state with the new value
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to set the temperature limit
      const response = await axios.post(
        'http://' + window.PI_IP + ':5000/set_limit',
        formData
      );

      // Log the response data to console
      console.log(response.data);

      // Navigate to the '/home' route
      navigate('/home');
    } catch (error) {
      // Alert the user in case of error
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      {/* Form for setting the temperature limit */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="temp_limit">New Limit</label>
        <br></br>
        <input
          type="text"
          id="temp_limit"
          name="temp_limit"
          value={formData.temp_limit}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit">Set</button>
      </form>
    </div>
  );
}

export default Time_Interval;
