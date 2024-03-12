import React,{useState, useEffect} from "react";
import axios from 'axios';

function Delete_U() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/delete_users');
        const dataList = response.data;
        console.log(dataList);
        setItems(dataList); // Update items state with fetched data
      } catch (error) {
        console.error('Fetch data error: ', error);
      }
    };
    fetchData(); // Call fetchData function when component mounts
  }, []);
  const [submittedValues, setSubmittedValues] = useState({});
  const handleSubmit = (key) => {
    setSubmittedValues((prevValues) => ({
      ...prevValues,
      [key]: true, 
    }));
  };
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <h1>Users</h1>
      {items.map((item) => (
        <li key={item}>
          {item}
          <button onClick={() => handleSubmit(item)}>Delete</button>
          {submittedValues[item] && <span>Deleted</span>}
        </li>
      ))}
    </div>
  );
}

export default Delete_U;
