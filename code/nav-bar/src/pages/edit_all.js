import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import Edit_s from "./edit_S";


function Edit_All() {
  // let items = ["id_1", "id_2", "id_3", "id_4"]; // This is where the items of anything to be displayed will go
  const [items, setSamples] = useState([]);

  const getSamples = async () => {
      try {
          const response = await axios.get('http://localhost:5000/display_S');
          console.log(response.data);
          setSamples(response.data);
      } catch (error) {
          alert('Error fetching samples:'+ error);
      }
  };

  useEffect(() => {
    getSamples();  // Trigger the GET request when the component mounts
  }, []); 

  let test_item = 0;
  let navigate = useNavigate()
  const navig = (_item)=>{
    return () =>{
      console.log("Hello ", _item)
      navigate("/edit_s/"+_item, {key : _item})
    }
  }
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <h1>Sample Id</h1>
      {items.map((item) => (
        <li key={item}>
          {item.id}, {item.type}
          {/* <button onClick={() => <Edit_s key={item}/>}>Edit</button> */}
          <button onClick={navig(item.id)}>Edit</button>
          {/* {submittedValues[item] && <span>Edit</span>} */}
        </li>
      ))}
    </div>
  );
}

export default Edit_All;
