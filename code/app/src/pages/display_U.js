import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";

function Display_U() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/display_U');
      const sortedUsers = response.data.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log(sortedUsers);
      setUsers(sortedUsers);
    } catch (error) {
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  useEffect(() => {
    getUsers(); // Trigger the GET request when the component mounts
  }, []);

  return (
    <div style={{height: '80vh'}}>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li
            className="list"
            key={user.id}
            style={{
              fontSize: '18px',
            }}
          >
            {user.id}: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Display_U;
