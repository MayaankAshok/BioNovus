import React from "react";

function Display_U() {
  let items = {
    "user 1": "operator",
    "user_2": "admin",
    "user_3": "reviewer",
  };// this is where the users will go

  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <h1>Users</h1>
      <ul>
        {Object.entries(items).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Display_U;
