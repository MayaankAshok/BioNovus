import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Settings from './pages/setting';
import Delete_U from './pages/delete_U';
import Delete_S from './pages/delete_S';
import Display_U from './pages/display_U';
import Display_S from './pages/display_S';
import Home from './pages/home';
import Display_R from './pages/display_R';
import Edit_All from './pages/edit_all';
import Edit_s from './pages/edit_S';
import NewUser from './pages/newuser';
import Start_Test from './pages/start_test';
window.username = 0;
window.category = 0;
function App() {


  document.body.style.background = "#676b68"

  return (
    <Router>
      {/* <Navbar> */}
      <Navbar />
      {/* if flag true then there is a user logged in otherwise not */}
      <Routes>
        {/* <Switch> */}
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/setting" element={<Settings />}></Route>
        <Route path="/delete_U" element={<Delete_U />}></Route>
        <Route path="/delete_S" element={<Delete_S />}></Route>
        <Route path="/display_U" element={<Display_U />}></Route>
        <Route path="/display_S" element={<Display_S />}></Route>
        <Route path="/display_R" element={<Display_R />}></Route>
        <Route path="/edit_all" element={<Edit_All />}></Route>
        <Route path="/edit_s/:key" element={<Edit_s />}></Route>
        <Route path="/newuser" element={<NewUser />}></Route>
        <Route path="/start_test" element={<Start_Test />}></Route>
      </Routes>
      {/* </Navbar> */}
    </Router>
  );
}

export default App;
