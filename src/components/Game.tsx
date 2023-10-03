import React, {useState, useEffect} from 'react';
import FooterComponent from './FooterComponent';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('Game Over');
  const [score, setScore] = useState(0);
  const [newTimer, setNewTimer] = useState<number>(0);
  const [timer, setTimer] = useState('00:00');
  const [pause, setPause] = useState('pause');

  const handleTimer = (updatedNewTimer: number) => {
    const minutes = Math.floor(updatedNewTimer/60);
    if (newTimer === 0) {
      setTimer('00:00')
    };
    if (updatedNewTimer < 10) {
      setTimer(`00:0${updatedNewTimer}`)
    } else if (updatedNewTimer >= 10 && updatedNewTimer < 60) {
      setTimer(`00:${updatedNewTimer}`)
    } else if (updatedNewTimer >= 60 && updatedNewTimer < 600 && (updatedNewTimer - Math.floor(updatedNewTimer/60)) < 10 ) {
      setTimer(`0${minutes}:0(${updatedNewTimer} - ${minutes})`)
    } else if (updatedNewTimer >= 600 && (updatedNewTimer - Math.floor(updatedNewTimer/60)) > 10 ) {
      setTimer(`${minutes}:(${updatedNewTimer} - ${minutes})`)
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setNewTimer((prevTimer) => {

        if ((pause === 'play' || pause === 'try again') && timerInterval !== null) {
          // Pause the timer interval
          const updatedNewTimer = prevTimer;
          clearInterval(timerInterval);
          handleTimer(updatedNewTimer); 
          return updatedNewTimer;
        } else {
          const updatedNewTimer = prevTimer + 1;
          handleTimer(updatedNewTimer); 
          return updatedNewTimer;
        }
      });
    }, 1000); 

    return () => {
      clearInterval(timerInterval);
    };
  }, [pause]);

  const handleNewGame = () => {
    setPause('pause');
    setGameOver(false);
    setScore(0);
    setNewTimer(0);
  };



  const handleGameOver = () => {
    setGameOver(true);
    setPause('try again');
  };

  useEffect(() => {
    if (score === 100) {
      handleGameOver();
      setGameOverMessage('Well done, you won!')
    }
  }, [score])

  const handleScore = (newScore: number) => {
      setScore(Math.floor(newScore/36*100));
  };

  const handlePauseClick = () => {
    if (pause === 'play') {
      setPause('pause');
    } else if (pause === 'try again') {
      handleNewGame();
      setPause('pause');
    } else if (pause === 'pause') {
      setPause('play');
    }
  };

  return (
    <div data-testid="Game-component" className='Game'>
      <header className="Game-header" data-testid="game-header">
        <div className="Game-timer-container" data-testid="timer-container">
          {timer}
        </div>
        <div className="Game-score-container" data-testid="score-container">
          Score: {score}%
        </div>
      </header>
      <div className="Game-container" data-testid="game-container">
        {gameOver ? <h3>{gameOverMessage}</h3> : null}
        <GameBoard handleGameOver={handleGameOver} handleScore={handleScore} pause={pause} />
        <button 
        onClick={handlePauseClick} 
        className="Game-button" 
        data-testid="game-button">
        {pause}
        </button>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
