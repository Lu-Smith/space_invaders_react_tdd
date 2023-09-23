import React from 'react';
import logo from './media/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" data-testid="App-header">
        Space Invaders
        <div className="App-shooting-star-1" data-testid="App-shooting-star-1" ></div>
        <img src={logo} alt="Space Invader Logo" className='App-logo' />
        <div className="App-shooting-star-2" data-testid="App-shooting-star-2"></div>
        <button className='App-start-button'>Start</button>
      </header>
    </div>
  );
}

export default App;
