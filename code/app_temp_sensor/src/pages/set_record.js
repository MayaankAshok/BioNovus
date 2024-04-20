import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Time_Interval() {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    time_interval: ''
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
      // Send a POST request to set the time interval
      const response = await axios.post(
        'http://' + window.PI_IP + ':5000/set_interval',
        { interval: formData.time_interval }
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
      {/* Form for setting the time interval */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="Time Interval">New Interval</label>
        <br></br>
        <input
          type="text"
          id="time_interval"
          name="time_interval"
          value={formData.time_interval}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit">Set</button>
      </form>
    </div>
  );
}

export default Time_Interval;
