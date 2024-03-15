import React, { useState, useN } from "react";
import { Link,useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import Edit_s from "./edit_S";


function Edit_All() {
  let items = ["id_1", "id_2", "id_3", "id_4"]; // This is where the items of anything to be displayed will go
  // const history = useHistory();
  // const [submittedValues, setSubmittedValues] = useState({});
  // const handleSubmit = (key) => {
  //   // setSubmittedValues((prevValues) => ({
  //   //   ...prevValues,
  //   //   [key]: true,
  //   // }));
  //   history.push("/edit_S", { key });
  // };
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
          {item}
          {/* <button onClick={() => <Edit_s key={item}/>}>Edit</button> */}
          <button onClick={navig(item)}>Edit</button>
          {/* {submittedValues[item] && <span>Edit</span>} */}
        </li>
      ))}
    </div>
  );
}

export default Edit_All;
