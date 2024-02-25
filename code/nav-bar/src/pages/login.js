import React from "react";

function Login() {
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
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}

export default Login;
