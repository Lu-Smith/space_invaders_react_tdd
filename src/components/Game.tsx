import React from 'react';
import FooterComponent from './FooterComponent';
import '../styles/Game.css';

const Game = () => {
  return (
    <div data-testid="Game-component" className='Game'>
      <header className="Game-header" data-testId="game-header">
        <div className="timer-container" data-testid="timer-container">
          00:00
        </div>
        <div className="score-container" data-testid="score-container">
          score
        </div>
      </header>
      <div className="game-container" data-testid="game-container">
        game
        <div data-testId="game-button-container">pause</div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
