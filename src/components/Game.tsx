import React, {useState} from 'react';
import FooterComponent from './FooterComponent';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hitTarget, setHitTarget] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleScore = () => {
    if (hitTarget) {
      setScore((prevScore) => prevScore + 1);
      setHitTarget(false);
    }
  };

  const handleHits = () => {
    setHitTarget(true);
  };

  return (
    <div data-testid="Game-component" className='Game'>
      <header className="Game-header" data-testid="game-header">
        <div className="Game-timer-container" data-testid="timer-container">
          00:00
        </div>
        <div className="Game-score-container" data-testid="score-container">
          Score: {score}
        </div>
      </header>
      <div className="Game-container" data-testid="game-container">
        {gameOver ? <h3>GameOver</h3> : null}
        <GameBoard handleGameOver={handleGameOver} handleHits={handleHits} />
        <button className="Game-button" data-testid="game-button">pause</button>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
