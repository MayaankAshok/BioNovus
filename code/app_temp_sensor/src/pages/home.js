import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css'; 
import NavItem from '../components/NavBar/NavItem'; 

function Home() {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  
  const HandleStartTest = (e) => {
    navigate('/start_test'); // Navigate to the '/start_test' route
  };

  return (
    <div>
      
    </div>
  );
}

export default Home;
