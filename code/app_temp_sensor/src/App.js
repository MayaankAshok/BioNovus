import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Analysis from './pages/analysis'
import Home from './pages/home'

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
        </Routes>
      {/* if flag true then there is a user logged in otherwise not */}
    </Router>
  );
}

export default App;
