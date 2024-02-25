import React,{useState} from "react";

// function same(){
//   document
// }

function Signup() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [repassword,setRepassword]=useState("");
  const [passwordMatch,setPasswordMatch]=useState(true);

  const UsernameChange=(event)=>{
    setUsername(event.target.value);
  }
  const PasswordChange =(event)=>{
    setPassword(event.target.value);
    setPasswordMatch(event.target.value===repassword)
  }
  const RePasswordChange =(event)=>{
    setRepassword(event.target.value);
    setPasswordMatch(password===event.target.value);
  }

  const Submit=(event)=>{
    if(password===repassword){
      console.log("form submitted");
    }else{
      console.log("passwords do not match");
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
      <form>
        <label for="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={UsernameChange}
        ></input>
        <br></br>
        <label for="password">password:</label>
        <br></br>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={PasswordChange}
          
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
          value={repassword}
          onChange={RePasswordChange}
        ></input>
        {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>}
        <br />
        <br></br>
        <label for="users">choose a user:</label>
        <select id="users" name="users">
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="operator">Operator</option>
        </select>
        <br></br>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}

export default Signup;
