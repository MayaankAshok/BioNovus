import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Delete_U() {
  // let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go
  // const [submittedValues, setSubmittedValues] = useState({});
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
      try {
          const response = await axios.get('http://localhost:5000/display_U_except_curr');
          console.log(response.data);
          setUsers(response.data);
      } catch (error) {
          console.error('Error fetching users:', error);
      }
    };
    
    
    useEffect(() => {
      getUsers();  // Trigger the GET request when the component mounts
    }, []); 
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete_U/${id}`);
      // After deletion, fetch the updated user list
      getUsers();
    } catch (error) {
      alert('Error deleting user:'+ error);
    }
  };

  // const handleSubmit = (key) => {
  //   setSubmittedValues((prevValues) => ({
  //     ...prevValues,
  //     [key]: true, 
  //   }));
  // };

  return (
    <div style={{ height: "80vh" }}>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.role}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delete_U;
