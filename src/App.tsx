import React from 'react';
import logo from './media/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="App-shooting-star"></div>
       Space Invaders
       <img src={logo} alt="Space Invader Logo" className='App-logo' />
       <div className="App-shooting-star"></div>
      </header>
     
    </div>
  );
}

export default App;
