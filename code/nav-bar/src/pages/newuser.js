import React,{useState} from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

function NewUser(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repassword: '',
        user:''
      });
      
      // const [passwordMatch,setPasswordMatch]=useState(true);
    
      const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

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
        <label for="password">password:</label>
        <br></br>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          
        ></input>
        <br></br>
        <label type="text" id="repassword">
          re-enter password:
        </label>
        <br></br>
        <input
          type="text"
          id="repassword"
          name="repassword"
          value={formData.repassword}
          onChange={handleChange}
        ></input>
        {/* {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>} */}
        <br />
        <br></br>
        
        <label for="users">choose a user:</label>
        <select id="users" name="users" onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="operator">Operator</option>
        </select>
        <br></br>
        <button type="submit">Create</button>
        
      </form>
    </div>
  );

}

export default NewUser;