import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useFilePicker} from 'use-file-picker';

function Start_Test() {
  const {openFilePicker, filesContent} = useFilePicker({
    accept: '.jpg',
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    s_id: '',
    s_type: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTestStart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          'http://localhost:5000/insert_sample',
          formData,
      );
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      alert('Test Start Error:' + error);
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
      <form onSubmit={handleTestStart}>
        <label htmlFor="s_id">sample_id:</label>
        <br></br>
        <input
          type="text"
          id="s_id"
          name="s_id"
          value={formData.s_id}
          onChange={handleChange}
        ></input>
        <br></br>
        <label htmlFor="s_type">sample_type:</label>
        <br></br>
        <input
          type="text"
          id="s_type"
          name="s_type"
          value={formData.s_type}
          onChange={handleChange}
        ></input>
        <br></br>
        <br></br>
        <button type="submit" value="submit">
          Start Test
        </button>
      </form>
      <br />
      <button onClick={() => openFilePicker()}>Select files</button>
      <br />
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          {/* <div key={index}>{file.content}</div> */}
          <br />
        </div>
      ))}
    </div>
  );
}

export default Start_Test;
