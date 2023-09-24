import React, { useState } from 'react';
import logo from './media/logo.png';
import './App.css';
import Game from './components/Game';

function App() {
  const [showHeader, setShowHeader] = useState(true);

  const handleClick = () => {
    setShowHeader(false);
  }

  return (
    <div className="App">
      {showHeader ? (
        <header className="App-header" data-testid="App-header">
        Space Invaders
        <div className="App-shooting-star-1" data-testid="App-shooting-star-1" ></div>
        <img src={logo} alt="Space Invader Logo" className='App-logo' />
        <div className="App-shooting-star-2" data-testid="App-shooting-star-2"></div>
        <button className='App-start-button' onClick={handleClick}>Start</button>
      </header>
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
