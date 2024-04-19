import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Time_Interval() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    time_interval: ''
  });

  // const [passwordMatch,setPasswordMatch]=useState(true);

  const handleChange = (e) => {
    const {time_interval, value} = e.target;

    setFormData((prevState) => ({
      ...prevState,
      time_interval:value,

    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (formData['repassword'] === formData['role']) {
      //   formData['role'] = 'admin';
      // }
      console.log(formData);
      const response = await axios.post(
          'http://localhost:5000/set_record',
          formData,
      );
      // window.username =  response.data.user_name
      // window.category = response.data.category
      console.log(response.data);
      navigate('/home');
    } catch (error) {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">New Interval</label>
        <br></br>
        <input
          type="text"
          id="Time Interval"
          name="Time Interval"
          value={formData.time_interval}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit" value="submit">
          Set
        </button>
      </form>
    </div>
  );
}

export default Time_Interval;