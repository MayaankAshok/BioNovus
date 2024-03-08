import React, { useState } from "react";
import axios from "axios";

function Login() {

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

  // const handleLogin = async e => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', );
  //   }
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <form>
        <label for="username">username:</label><br></br>
        <input type="text" id="username" name="username"></input><br></br>
        <label for="password">password:</label><br></br>
        <input type="text" id="password" name="password"></input><br></br>
        <br></br>
        <button type="submit" value="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
