import React,{useState} from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

// function same(){
//   document
// }

function Signup() {
  // const [username,setUsername]=useState("");
  // const [password,setPassword]=useState("");
  // const [repassword,setRepassword]=useState("");

  const navigate = useNavigate()
  // const bcrypt = require('bcrypt');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: ''
  });
  // const [passwordMatch,setPasswordMatch]=useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error('Signup error:', error);
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
      <form onSubmit={handleSubmit}>
        <label for="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <br></br>
        <label type="password" for="password">password:</label>
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
        <button type="submit">Sign Up</button>
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
