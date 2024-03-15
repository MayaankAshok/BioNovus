import React from "react";
import { useParams } from "react-router-dom";

function Edit_s() {
    const { key } = useParams(); // Import `useParams` from 'react-router-dom'
    
    console.log("hiii");
    console.log(key);
    
    return (
        <div>

            <h3>Edit Sample id: {key}</h3><br></br>
            <form>
                <label for="id">Sample Id</label><br></br>
                <input type="text" id="id" name="id"></input><br></br>
                <label for="type">Sample type</label><br></br>
                <input type="text" id="type" name="type"></input><br></br>
                <button type="submit" value="submit">submit</button>

            </form>
        </div>
    );
}

export default Edit_s;
