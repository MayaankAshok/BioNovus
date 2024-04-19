import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Analysis from './pages/analysis'
import Home from './pages/home'
import Clear_Data from './pages/clear_data';
import Set_Record from './pages/set_record'
import Download_Result from './pages/download_result'

window.username = 0;
window.category = 0;
function App() {
  document.body.style.background = "#676b68"

  return (
    <Router>
      {/* <Navbar> */}
      <Navbar />
      <Routes>
        {/* <Switch> */}
        <Route path="/analysis" element={<Analysis />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/clear_data" element={<Clear_Data />}></Route>
        <Route path="/set_record" element={<Set_Record />}></Route>
        <Route path="/download_result" element={<Download_Result />}></Route>
        </Routes>
      {/* if flag true then there is a user logged in otherwise not */}
    </Router>
  );
}

export default App;
