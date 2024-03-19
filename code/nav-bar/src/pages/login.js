import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          'http://localhost:5000/login',
          formData,
      );
      window.username = response.data.user_name;
      window.category = response.data.category;
      console.log(response.data);

      navigate('/home');
    } catch (error) {
      alert('Logging Error:' + error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        color:'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <form
        style={{
          color: "white",
          background : "#0a1a04",paddingLeft: "25px", paddingRight: "25px", paddingBottom: "10px", paddingTop: "10px",
          clipPath: "polygon( 15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)",
        }}
         onSubmit={handleLogin}>
        <label htmlFor="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          style={{
            backgroundColor: "#243829",
            border:"None",
            color : "white"
          }}
          value={formData.username}
          onChange={handleChange}
        ></input>
        <br></br>
        <label htmlFor="password" type="password">
          password:
        </label>
        <br></br>
        <input
          style={{
            backgroundColor: "#243829",
            border:"None",
            color : "white"
          }}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <br></br>
        <br></br>
        <div
          style={{
            position: "relative",
            left:"50%"
          }}
        >
          <button
            style={{
              position:"relative",
              top:"-5px",
              left:"-20%",
              color : "white",
              border :"None",
              background : "#243829",paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px",
              clipPath: "polygon( 5px 0, calc(100% - 5px) 0, 100% 50%, calc(100% - 5px) 100%, 5px 100%, 0% 50%)",    
            }}
              type="submit" value="submit">
            Login
          </button>
        </div>  
      </form>
    </div>
  );
}

export default Login;
