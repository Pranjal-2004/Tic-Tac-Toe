import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='heading'>
        <h1>Tic-Tac-Toe Game</h1>
        <button onClick={() => navigate('/')}>Double Player</button>
        <button onClick={() => navigate('/multi')}>Multi Player</button> 
    </div>
  );
}

export default Header;
