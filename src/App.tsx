import React, { useState } from 'react';
import logo from './media/logo.png';
import './App.css';

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
        <div className="App-game-container">
          Game Content
        </div>
      )}
    </div>
  );
}

export default App;
