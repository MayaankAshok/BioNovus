import React from 'react';
import {Link} from 'react-router-dom';
import './button.css';
// import "/home/nitin/Documents/DASS/dass-project-spring-2024-team-9/code/nav-bar/src/App.css";

function Settings() {
  const perm1 = (category) => {
    return category === 'admin';
  };
  const perm2 = (category) => {
    return category === 'admin' || category === 'reviewer';
  };
  const perm3 = (category) => {
    return (
      category === 'admin' || category === 'reviewer' || category === 'operator'
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      {/* <h3>{window.username}</h3> */}
      {/* <h3>{window.category}</h3> */}
      <ul className="list">
        {/* <li><Link to="/delete_U">Delete Users</Link></li>
                <li><Link to="/delete_S">Delete Samples</Link></li>
                <li><Link to="/newuser">Create New User</Link></li> */}
        {perm1(window.category) && (
          <li>
            <Link to="/delete_U">Delete Users</Link>
          </li>
        )}
        {perm1(window.category) && (
          <li>
            <Link to="/delete_S">Delete Samples</Link>
          </li>
        )}
        {perm1(window.category) && (
          <li>
            <Link to="/newuser">Create New User</Link>
          </li>
        )}
        {perm2(window.category) && (
          <li>
            <Link to="/display_U">Display Users</Link>
          </li>
        )}
        {perm3(window.category) && (
          <li>
            <Link to="/display_R">Display Results</Link>
          </li>
        )}
        {perm2(window.category) && (
          <li>
            <Link to="/edit_all">Edit Samples</Link>
          </li>
        )}
        {/* <li><Link to="/delete_U">Delete Users</Link></li> */}
        {/* <li><Link to="/delete_S">Delete Samples</Link></li>
                <li><Link to="/signup">Create New User</Link></li>
                <li><Link to="/display_U">Display Users</Link></li>
                <li><Link to="/display_S">Display Samples</Link></li>
                <li><Link to="/display_R">Display Results</Link></li>
                <li><Link to="/edit_all">Edit Samples</Link></li>

                <li><Link to="/edit_all">Edit Samples</Link></li> */}
      </ul>
    </div>
  );
}

export default Settings;
