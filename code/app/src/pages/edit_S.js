import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Edit_s() {
  const {key} = useParams(); // Import `useParams` from 'react-router-dom'

  const navigate = useNavigate();

  console.log('hiii');
  console.log(key);

  const [formData, setFormData] = useState({
    s_id: '',
    type: '',
  });
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData['old_id'] = key;
      console.log(formData);
      const response = await axios.post(
          'http://localhost:5000/edit_sample',
          formData,
      );
      console.log(response.data);
      navigate('/setting');
    } catch (error) {
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h3>Edit Sample id: {key}</h3>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label htmlFor="s_id">Sample Id</label>
        <br></br>
        <input
          type="text"
          id="s_id"
          name="s_id"
          value={formData.s_id}
          onChange={handleChange}
        ></input>
        <br></br>
        <label htmlFor="type">Sample type</label>
        <br></br>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit" value="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Edit_s;
