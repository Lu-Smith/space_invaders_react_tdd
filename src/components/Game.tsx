import React from 'react';
import FooterComponent from './FooterComponent';

const Game = () => {
  return (
    <div data-testid="Game-component">
      <div className="timer-container" data-testid="timer-container">
        00:00
      </div>
      <div className="score-container" data-testid="score-container">
        score
      </div>
      <div className="game-container" data-testid="game-container">
        game
        <div data-testId="game-button-container">pause</div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
