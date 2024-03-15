import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Login({updateFlag}) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState ({
    username: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      window.username =  response.data.user_name
      window.category = response.data.category
      console.log(response.data)
      updateFlag(true)
      navigate("/home")
    } catch (error) {
      console.error("Logging Error:", error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <form onSubmit={handleLogin}>
        <label for="username">username:</label><br></br>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}></input><br></br>
        <label for="password">password:</label><br></br>
        <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}></input><br></br>
        <br></br>
        <button type="submit" value="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
