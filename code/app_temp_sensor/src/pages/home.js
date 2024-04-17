import React from 'react';
import {useNavigate} from 'react-router-dom';
import './button.css';
import NavItem from '../components/NavBar/NavItem';
function Home() {
  const navigate = useNavigate();

  const HandleStartTest = (e) => {
    navigate('/start_test');
  };

  return (
    <div>
    </div>
  );
}

export default Home;
