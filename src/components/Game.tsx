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
  let timerInterval: NodeJS.Timer;;

  useEffect(() => {
    handleTimer();
  }, []);

  const handleTimer = () => {
    timerInterval = setInterval(() => {
      setNewTimer((newTimer) => newTimer + 1)
      console.log(newTimer)
    }, 1000)

   

    if (pause === 'pause') {
      clearInterval(timerInterval);

    } else if (pause === 'play') {
      timerInterval = setInterval(() => {
        setNewTimer((prevTimer) => prevTimer + 1);
      }, 1000);

    }

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
  };


  const handleNewGame = () => {
    clearInterval(timerInterval);
    setPause('pause');
    setGameOver(false);
    setScore(0);
    setNewTimer(0);
    handleTimer();
  };

  if (pause === 'new game') {
    handleNewGame();
  }

  const handleGameOver = () => {
    setGameOver(true);
    setScore(0);
  };

  const handleScore = () => {
      setScore((prevScore) => prevScore + 1);
  };

  return (
    <div data-testid="Game-component" className='Game'>
      <header className="Game-header" data-testid="game-header">
        <div className="Game-timer-container" data-testid="timer-container">
          {timer}
        </div>
        <div className="Game-score-container" data-testid="score-container">
          Score: {score}
        </div>
      </header>
      <div className="Game-container" data-testid="game-container">
        {gameOver ? <h3>GameOver</h3> : null}
        <GameBoard handleGameOver={handleGameOver} handleScore={handleScore} pause={pause} />
        <button className="Game-button" data-testid="game-button">{pause}</button>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Game
