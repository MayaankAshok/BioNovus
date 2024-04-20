import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Edit_s from "./edit_S";
import './button.css';
import NavItem from '../components/NavBar/NavItem';

function Edit_All() {
  const [items, setSamples] = useState([]);

  const getSamples = async () => {
    try {
      const response = await axios.get('http://localhost:5000/display_S');
      const sortedSamples = response.data.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log(sortedSamples);
      setSamples(sortedSamples);
    } catch (error) {
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  useEffect(() => {
    getSamples(); // Trigger the GET request when the component mounts
  }, []);

  const navigate = useNavigate();
  const navig = (_item) => {
    return () => {
      console.log('Hello ', _item);
      navigate('/edit_s/' + _item, {key: _item});
    };
  };
  return (
    <div
      style={{
        height: '80vh',
      }}
    >
      <h1>Select Sample Id to Edit</h1>
      {items.map((item) => (
        <li
          className="list"
          key={item}
          style={{
            fontSize: '18px',
          }}
        >
          {item.id}, {item.type}, {item.u_name}
          
          <button className="button1" onClick={navig(item.id)}>
            <NavItem name="Edit"></NavItem>
          </button>
          
        </li>
      ))}
    </div>
  );
}

export default Edit_All;
