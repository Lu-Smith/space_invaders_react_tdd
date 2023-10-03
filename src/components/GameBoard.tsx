import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';

interface GameBoardProps {
    handleGameOver: () => void; 
    handleScore: (newScore: number) => void;
    pause: string;
    gameOver: boolean;
  }
  
const GameBoard: React.FC<GameBoardProps> = ({ handleGameOver, handleScore, pause, gameOver }) => {
    const numRows = 20; 
    const numCols = 25; 
    const totalSquares = numRows * numCols;
 
    const [alienInvaders, setAlienInvaders] = useState([
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,
      26,27,28,29,30,31,32,33,34,35,36,37,
      52,53,54,55,56,57,58,59,60,61
  ])
    const [newAlienInvaders, setNewAlienInvaders] = useState([...alienInvaders]);

    const [spaceshipIndex, setSpaceshipIndex] = useState(487);
    const [laserIndex, setLaserIndex] = useState<number[]>([]);
    const [shootLaser, setShootLaser] = useState(false);
    const [direction, setDirection] = useState(1);
    const squares: JSX.Element[]= [];

    //Laser
    useEffect(() => {
    // Calculate the positions of lasers in that column
    const lasersInColumn = Array.from({ length: numRows }, (_, row) =>
      spaceshipIndex - row * numCols
    );

    setLaserIndex(lasersInColumn);

  }, [spaceshipIndex])



//display GameBoard
  for (let i = 0; i < totalSquares; i++) {
    let squareClass = 'GameBoard-square';
    let squareId = 'square';

    const isInvader = newAlienInvaders.includes(i);
    const isSpaceship = spaceshipIndex === i;
    const isLaser = laserIndex.includes(i);

    if (isInvader) {
      squareClass = 'GameBoard-square invader';
      squareId = 'invader';
    } else if (isSpaceship) {
      squareClass = 'GameBoard-square spaceship';
      squareId = 'spaceship';
    } else if (shootLaser && isLaser) {
        squareClass = 'GameBoard-square laser';
    } 

    squares.push(<div key={i} className={squareClass} data-testid={squareId}></div>);
  }

  const resetInvaders = () => {
    const initialAlienInvaders = [
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,
      26,27,28,29,30,31,32,33,34,35,36,37,
      52,53,54,55,56,57,58,59,60,61
    ];
    
    setAlienInvaders(initialAlienInvaders);
    setNewAlienInvaders([...initialAlienInvaders]);
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (gameOver) {
  //       resetInvaders();
  //     }
  //   }, 1500)
    
  //   return () => {
  //         clearInterval(intervalId);
  //   };
  // }, [gameOver])

  useEffect(() => {
    console.log(gameOver);
    
    if (pause === 'pause' && !gameOver) {        
      const intervalId = setInterval(() => {
      // Calculate the new positions of alienInvaders
         
      for (let i = 0; i < newAlienInvaders.length; i++) {
        if (direction === 1) {
          if(newAlienInvaders[i] < 475 ) {
            newAlienInvaders[i] += 1;
          } else {
            handleGameOver();
          }
        } else {
          if(newAlienInvaders[i] < 475 ) {
          newAlienInvaders[i] -= 1;
          } else {
            handleGameOver();
          }
        }
    } 
        
      // Check if they should change direction
      const r = 0;
      const rightEdge = [r, r+(25*1), r+(25*2), r+(25*3), r+(25*4), r+(25*5), r+(25*6), r+(25*7), r+(25*8), r+(25*9), r+(25*10), r+(25*11), r+(25*12), r+(25*13), r+(25*14), r+(25*15), r+(25*16), r+(25*17), r+(25*18)];
      const l = 24;
      const leftEdge = [l, l*2, l*3, l*4, l*5, l*6, l*7, l*8, l*9, l*10, l*11, l*12, l*13, l*14, l*15, l*16, l*17, l*18, l*19];
      
      if (newAlienInvaders.some((invader) => rightEdge.includes(invader % numCols))) {
        setDirection((prevDirection) => -prevDirection);
          for (let i = 0; i < newAlienInvaders.length; i++) {
              newAlienInvaders[i] += 25;
          }
      }
   
      if (newAlienInvaders.some((invader) => leftEdge.includes(invader % numCols))) {
          setDirection((prevDirection) => -prevDirection);
          for (let i = 0; i < newAlienInvaders.length; i++) {
              newAlienInvaders[i] += 25;
        }
      }
    }, 100);
  
    return () => {
      clearInterval(intervalId);
    };
  } 

  }, [gameOver, direction, newAlienInvaders, pause, handleGameOver]);

  //updatedScore

  useEffect (() => {
    const newScore = alienInvaders.length - newAlienInvaders.length;
    handleScore(newScore);
  }, [newAlienInvaders, newAlienInvaders.length, handleScore, alienInvaders.length])


  //shoot laser
  useEffect(() => {   
      const shootLasers = () => {
        const hitInvaders = newAlienInvaders.filter((invader) => !laserIndex.includes(invader));
        setNewAlienInvaders(hitInvaders);

      };

      const handleKeyDown = (e: KeyboardEvent | null ) => {
          if (e !== null) {
              if (e.key === 'ArrowLeft') {
                  setSpaceshipIndex((prevIndex) => Math.max(prevIndex - 1, 475));
              }
              if (e.key === 'ArrowRight') {
                  setSpaceshipIndex((prevIndex) => Math.min(prevIndex + 1, totalSquares - 1));
              }

              if (e.key === 'ArrowUp') {
                setShootLaser(true);
                shootLasers();         
              }

              window.addEventListener('keyup', () => {
                setShootLaser(false);
              });
          }  
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };

  }, [totalSquares, laserIndex, newAlienInvaders]);

  return (
    <div className="Game-board" data-testid="Game-board">
        {squares}
    </div>
  )
}

export default GameBoard;