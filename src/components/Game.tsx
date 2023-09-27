import React from 'react';
import FooterComponent from './FooterComponent';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {
  return (
    <div data-testid="Game-component" className='Game'>
      <header className="Game-header" data-testid="game-header">
        <div className="Game-timer-container" data-testid="timer-container">
          00:00
        </div>
        <div className="Game-score-container" data-testid="score-container">
          score
        </div>
      </header>
      <div className="Game-container" data-testid="game-container">
        <GameBoard />
        <button className="Game-button" data-testid="game-button">pause</button>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
