import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useFilePicker} from 'use-file-picker';

function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

function Start_Test() {
  let fileData = 0;
  const {openFilePicker, filesContent} = useFilePicker({
    readAs : "ArrayBuffer",
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
      s_type: value,
    }));
  };

  const handleTestStart = async (e) => {
    e.preventDefault();
    console.log(  "fileData", fileData);
    try {
      if (formData['s_id'] === formData['s_type']) {
        formData['s_type'] = 'blood';
      }
      const response = await axios.post(
          'http://localhost:5000/insert_sample',
          {'s_id': formData['s_id'], 's_type': formData['s_type'], 's_data' : fileData},
      );
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
        <select 
          type="text"
          id="s_type"
          name="s_type"
          
          onChange={handleChange}
          
        >
          <option value="blood">blood</option>
          <option value="urine">urine</option>
          <option value="saliva">saliva</option>
        </select>
        <br></br>
        <br></br>
        <button type="submit" value="submit">
          Start Test
        </button>
      </form>
      <br />
      <button onClick={() => openFilePicker()}>Select files</button>
      <br />
      {filesContent.map((file, index) => {
        // console.log(file);
        // let utf8Encode = new TextEncoder();

        // fileData = utf8Encode.encode(file.content);
        console.log("hello", file.content);
        fileData = _arrayBufferToBase64(file.content);
        // fileData = file.content;
        
        (
        <div key={index}>
          <h2>{file.name}</h2>
          {/* <div key={index}>{file.content}</div> */}
          <br />
        </div>
      )})}
    </div>
  );
}

export default Start_Test;
