import React from 'react';
import './Navbar.css'; // Import CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Generate Graphs</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
