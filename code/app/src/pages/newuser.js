import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function NewUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: '',
    role: '',
  });

  // const [passwordMatch,setPasswordMatch]=useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      role: value,
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
          'http://localhost:5000/new_user',
          formData,
      );
      // window.username =  response.data.user_name
      // window.category = response.data.category
      console.log(response.data);
      navigate('/setting');
    } catch (error) {
      alert('Logging Error:' + error);
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
        <label htmlFor="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <br></br>
        <label type="password" htmlFor="password">
          password:
        </label>
        <br></br>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <br></br>
        <label type="password" id="repassword">
          re-enter password:
        </label>
        <br></br>
        <input
          type="password"
          id="repassword"
          name="repassword"
          value={formData.repassword}
          onChange={handleChange}
        ></input>
        {/* {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>} */}
        <br />
        <br></br>

        <label htmlFor="users">choose a user:</label>
        <select id="users" name="userRole" onChange={handleChange}>
          <option value='-'>-</option>
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="operator">Operator</option>
        </select>
        <br></br>
        <button type="submit" value="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewUser;
