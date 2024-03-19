import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// function same(){
//   document
// }

function Signup() {
  // const [username,setUsername]=useState("");
  // const [password,setPassword]=useState("");
  // const [repassword,setRepassword]=useState("");

  const navigate = useNavigate();
  // const bcrypt = require('bcrypt');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: '',
  });
  // const [passwordMatch,setPasswordMatch]=useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const UsernameChange=(event)=>{
  //   setUsername(event.target.value);
  // }
  // const PasswordChange =(event)=>{
  //   setPassword(event.target.value);
  //   setPasswordMatch(event.target.value===repassword)
  // }
  // const RePasswordChange =(event)=>{
  //   setRepassword(event.target.value);
  //   setPasswordMatch(password===event.target.value);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          'http://localhost:5000/signup',
          formData,
      );
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      alert('Signup error:' + error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        fontFamily:"consolas",
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <form
        style={{
        color: "white",
        fontFamily:"consolas",
        background : "#0a1a04",paddingLeft: "25px", paddingRight: "25px", paddingBottom: "10px", paddingTop: "10px",
        clipPath: "polygon( 15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)",

        }}
       onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          style={{
            backgroundColor: "#243829",
            border:"None",
            fontFamily:"consolas",
            color : "white"
          }}
          value={formData.username}
          onChange={handleChange}
        ></input>
        <br></br>
        <label 
        type="password" htmlFor="password">
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
        <label type="password" id="repassword">
          re-enter password:
        </label>
        <br></br>
        <input
          style={{
            backgroundColor: "#243829",
            border:"None",
            color : "white"
          }}
          type="password"
          id="repassword"
          name="repassword"
          value={formData.repassword}
          onChange={handleChange}
        ></input>
        {/* {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>} */}
        <br />
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
              left:"-25%",
              color : "white",
              border :"None",
              fontFamily:"consolas",
              background : "#243829",paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px",
              clipPath: "polygon( 5px 0, calc(100% - 5px) 0, 100% 50%, calc(100% - 5px) 100%, 5px 100%, 0% 50%)",    
            }}
            type="submit">
            Sign Up
          </button>
        </div>
        {/* <label for="users">choose a user:</label>
        <select id="users" name="users">
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="operator">Operator</option>
        </select>
        <br></br>
        <input type="submit" value="submit"></input> */}
      </form>
    </div>
  );
}

export default Signup;
