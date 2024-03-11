import React from "react";
import { Link } from "react-router-dom";
// import "/home/nitin/Documents/DASS/dass-project-spring-2024-team-9/code/nav-bar/src/App.css";


function Settings() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
            }}
        >
            <ul>
                <li><Link to="/delete_U">Delete Users</Link></li>
                <li><Link to="/delete_S">Delete Samples</Link></li>
                <li><Link to="/signup">Create New User</Link></li>
                <li><Link to="/display_U">Display Users</Link></li>
                <li><Link to="/display_S">Display Samples</Link></li>
            </ul>
            
            
            
        </div>
    );
}

export default Settings;
