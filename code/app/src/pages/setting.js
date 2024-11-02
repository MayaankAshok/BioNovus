import React from "react";
import { Link } from "react-router-dom";
// import "/home/nitin/Documents/DASS/dass-project-spring-2024-team-9/code/nav-bar/src/App.css";
import ListItem from "./ListItem";

function Settings() {
    let perm1 = (category) =>{
        return  category == "admin"  
    } 
    let perm2 = (category) =>{
        return  category == "admin" || category == "reviewer"   
    } 
    let perm3 = (category) =>{
        return  category == "admin" || category == "reviewer" ||    category == "operator" 
    } 
    return (
        <div
            style={{
                // display: "flex",
                // justifyContent: "space-around",
                // alignItems: "center",
                // height: "50vh",
            }}
        >
            {/* <h3>{window.username}</h3> */}
            {/* <h3>{window.category}</h3> */}
            {/* <ul> */}
                {/* <li><Link to="/delete_U">Delete Users</Link></li>
                <li><Link to="/delete_S">Delete Samples</Link></li>
                <li><Link to="/newuser">Create New User</Link></li> */}
                { perm1(window.category) && <ListItem link="/delete_U" name="Delete Users" ></ListItem>}
                { perm1(window.category) && <ListItem link="/delete_S" name="Delete Samples"> </ListItem>}
                { perm1(window.category) && <ListItem link="/newuser" name="Create New User"> </ListItem>}
                { perm2(window.category) && <ListItem link="/display_U" name="Display Users"> </ListItem>}
                { perm3(window.category) && <ListItem link="/display_R" name="Display Results" ></ListItem>}
                { perm2(window.category) && <ListItem link="/edit_all" name="Edit Samples" ></ListItem>}
                {/* { perm3(window.category) && <li><Link to="/display_R">Display Results</Link></li>} */}
                {/* { perm2(window.category) &&   <li><Link to="/edit_all">Edit Samples</Link></li>} */}
                {/* <li><Link to="/delete_U">Delete Users</Link></li> */}
                {/* <li><Link to="/delete_S">Delete Samples</Link></li>
                <li><Link to="/signup">Create New User</Link></li>
                <li><Link to="/display_U">Display Users</Link></li>
                <li><Link to="/display_S">Display Samples</Link></li>
                <li><Link to="/display_R">Display Results</Link></li>
                <li><Link to="/edit_all">Edit Samples</Link></li>
                
                <li><Link to="/edit_all">Edit Samples</Link></li> */}
            {/* </ul> */}
            
            
            
        </div>
    );
}

export default Settings;
