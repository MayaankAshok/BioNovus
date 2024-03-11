import React,{useState} from "react";

function Delete_S() {
  let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go
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
      <h1>Sample Id</h1>
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

export default Delete_S;
