import React from 'react';
import {useNavigate} from 'react-router-dom';
import './button.css';

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
      <button className="button button1" onClick={() => HandleStartTest()}>
        Test start
      </button>
    </div>
  );
}

export default Home;
