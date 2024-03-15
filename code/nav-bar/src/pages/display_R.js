import React,{useState} from "react";

function Display_R() {
  let items = ["id_1", "id_2", "id_3", "id_4"]; //this is where the items of anything to be displayed will go

  
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

        </li>
      ))}
    </div>
  );
}

export default Display_R;
