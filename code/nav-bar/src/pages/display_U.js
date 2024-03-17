import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Display_U() {
  
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
      try {
          const response = await axios.get('http://localhost:5000/display_U');
          console.log(response.data);
          setUsers(response.data);
      } catch (error) {
          alert('Error fetching users:'+ error);
      }
  };

  useEffect(() => {
    getUsers();  // Trigger the GET request when the component mounts
}, []); 

return (
  <div style={{ height: "80vh" }}>
    <h1>Users</h1>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id}: {user.role}
        </li>
      ))}
    </ul>
  </div>
);
}

export default Display_U;
