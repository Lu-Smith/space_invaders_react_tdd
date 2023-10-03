import React, {useState, useEffect} from 'react';
import FooterComponent from './FooterComponent';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [score, setScore] = useState(0);
  const [newTimer, setNewTimer] = useState<number>(0);
  const [timer, setTimer] = useState('00:00');
  const [pause, setPause] = useState('pause');
  const [showGameBoard, setShowGameBoard] = useState(true);

  const restartGameBoard = () => {
    setShowGameBoard(false); // Unmount the child component
    setTimeout(() => setShowGameBoard(true), 0); // Remount the child component
  };


  useEffect(() => {
    //game can not be longer than 2min
    const handleTimer = (updatedNewTimer: number) => {
      const minutes = Math.floor(updatedNewTimer/60);
      const seconds = updatedNewTimer - minutes;
      if (newTimer === 0) {
        setTimer('00:00')
      };
      if (updatedNewTimer < 10) {
        setTimer(`00:0${updatedNewTimer}`)
      } else if (updatedNewTimer >= 10 && updatedNewTimer < 60) {
        setTimer(`00:${updatedNewTimer}`)
      } else {
        if (seconds < 10) {
          setTimer(`0${minutes}:0${seconds}`)
        } else if (seconds >= 10 ) {
          setTimer(`0${minutes}:${seconds}`)
        }
      } 
    };

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
  }, [pause, newTimer]);

  const handleNewGame = () => {
    setPause('pause');
    setGameOver(false);
    setScore(0);
    setNewTimer(0);
    setGameOverMessage('');
    restartGameBoard();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setPause('try again');
  };

  useEffect(() => {
    if (score === 100) {
      handleGameOver();
      setGameOverMessage('Well done, you won!');
    } 
    else  if (score !== 100 && gameOver) {
      setGameOverMessage('Game Over! You Lost!');
    }
  }, [score, gameOver])

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
        {showGameBoard && <GameBoard handleGameOver={handleGameOver} handleScore={handleScore} pause={pause} gameOver={gameOver} />}
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
