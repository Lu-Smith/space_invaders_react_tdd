import React, {useState, useEffect} from 'react';
import FooterComponent from './FooterComponent';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [newTimer, setNewTimer] = useState(0);
  const [timer, setTimer] = useState('00:00');
  const [pause, setPause] = useState('pause');

  const handleTimer = () => {
    const minutes = Math.floor(newTimer/60);
    if (newTimer < 10) {
      setTimer(`00:0${newTimer}`)
    } else if (newTimer > 10 && newTimer < 60) {
      setTimer(`00:${newTimer}`)
    } else if (newTimer > 60 && newTimer < 600 && (newTimer - Math.floor(newTimer/60)) < 10 ) {
      setTimer(`0${minutes}:0(${newTimer} - ${minutes})`)
    } else if (newTimer > 600 && (newTimer - Math.floor(newTimer/60)) > 10 ) {
      setTimer(`${minutes}:(${newTimer} - ${minutes})`)
    }
    console.log(newTimer)
    console.log('timer', timer)
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setNewTimer((prevTimer) => prevTimer + 1);
      handleTimer();
    }, 1000); 

  

    return () => {
      clearInterval(timerInterval);
    };
  }, []);



  const handleNewGame = () => {
    setPause('pause');
    setGameOver(false);
    setScore(0);
    setNewTimer(0);
  };

  const handleGameOver = () => {
    setGameOver(true);
    setScore(0);
    setPause('try again');
  };

  const handleScore = () => {
      setScore((prevScore) => prevScore + 1);
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
          {timer} {newTimer}
        </div>
        <div className="Game-score-container" data-testid="score-container">
          Score: {score}
        </div>
      </header>
      <div className="Game-container" data-testid="game-container">
        {gameOver ? <h3>GameOver</h3> : null}
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
