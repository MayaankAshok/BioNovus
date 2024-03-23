import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './button.css';
import { Nav } from '../components/NavBar/NavElements';
import NavItem from '../components/NavBar/NavItem';

function Display_R() {
  // let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go
  const [items, setResults] = useState([]);

  const getResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/display_R');
      const sortedResults = response.data.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log(sortedResults);
      setResults(sortedResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    getResults(); // Trigger the GET request when the component mounts
  }, []);

  return (
    <div
      style={{
        height: '80vh',
      }}
    >
      <h1>All Results</h1>
      {items.map((item) => (
        <li
          className="list"
          key={item.id}
          style={{
            fontSize: '18px',
          }}
        >
          {item.id}: {item.type}
          <button className="button1"><NavItem name="Print"></NavItem></button>
        </li>
      ))}
    </div>
  );
}

export default Display_R;
