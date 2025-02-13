import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
import './button.css';
import NavItem from '../components/NavBar/NavItem';

function Delete_U() {
  // let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go
  // const [submittedValues, setSubmittedValues] = useState({});
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/display_U_except_curr');
      const sortedUsers = response.data.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log(sortedUsers);
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers(); // Trigger the GET request when the component mounts
  }, []);
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if(confirmDelete){
    try {
      await axios.delete(`http://localhost:5000/delete_U/${id}`);
      // After deletion, fetch the updated user list
      getUsers();
    } catch (error) {
      alert('Logging Error: ' + error.response.data.error);
    }
  }
  };

  // const handleSubmit = (key) => {
  //   setSubmittedValues((prevValues) => ({
  //     ...prevValues,
  //     [key]: true,
  //   }));
  // };

  return (
    <div style={{height: '80vh'}}>
      <h2>Select Users to Delete</h2>
      <ul>
        {users.map((user) => (
          <li className="list" key={user.id}>
            {user.id}: {user.role}
            <button className="button1" onClick={() => deleteUser(user.id)}>
              <NavItem name="Delete"></NavItem>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delete_U;
