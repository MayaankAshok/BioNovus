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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '71vh',
      }}
    >
      <button className="button1" onClick={() => HandleStartTest()}>
        <NavItem name="Start Test"></NavItem>
      </button>
    </div>
  );
}

export default Home;
