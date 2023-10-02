import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';

interface GameBoardProps {
    handleGameOver: () => void; 
    handleScore: () => void;
    pause: string;
  }
  
const GameBoard: React.FC<GameBoardProps> = ({ handleGameOver, handleScore, pause }) => {
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
    const [laserIndex, setLaserIndex] = useState(spaceshipIndex - 25);
    const [shootLaser, setShootLaser] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    const [direction, setDirection] = useState(1);
    const squares: JSX.Element[]= [];

    useEffect(() => {
        setLaserIndex(spaceshipIndex-25);
    }, [spaceshipIndex]);

    useEffect(() => {
      if (pause === 'pause') {
        const intervalId = setInterval(() => {
        // Calculate the new positions of alienInvaders
        for (let i = 0; i < newAlienInvaders.length; i++) {
          if(!gameLost) {
            if (direction === 1) {
              newAlienInvaders[i] += 1;
            } else {
              newAlienInvaders[i] -= 1;
            }
          }
        }
        const r = 0;
        const rightEdge = [r, r+(25*1), r+(25*2), r+(25*3), r+(25*4), r+(25*5), r+(25*6), r+(25*7), r+(25*8), r+(25*9), r+(25*10), r+(25*11), r+(25*12), r+(25*13), r+(25*14), r+(25*15), r+(25*16), r+(25*17), r+(25*18)];
        // Check if they should change direction
        if (newAlienInvaders.some((invader) => rightEdge.includes(invader % numCols))) {
          setDirection((prevDirection) => -prevDirection);
          if(!gameLost) {
            for (let i = 0; i < newAlienInvaders.length; i++) {
                newAlienInvaders[i] += 25;
            }
          }
        }
        const l = 24;
        const leftEdge = [l, l*2, l*3, l*4, l*5, l*6, l*7, l*8, l*9, l*10, l*11, l*12, l*13, l*14, l*15, l*16, l*17, l*18, l*19];
        if (newAlienInvaders.some((invader) => leftEdge.includes(invader % numCols))) {

          if(!gameLost) {
            setDirection((prevDirection) => -prevDirection);
            for (let i = 0; i < newAlienInvaders.length; i++) {
                newAlienInvaders[i] += 25;
            }
          }
        }
        setAlienInvaders(newAlienInvaders);
        if (newAlienInvaders.some((invader) => invader > 475)) {
          handleGameOver(); 
          setGameLost(true);
          setShootLaser(false);
          setNewAlienInvaders([
            0,1,2,3,4,5,6,7,8,9,10,11,12,13,
            26,27,28,29,30,31,32,33,34,35,36,37,
            52,53,54,55,56,57,58,59,60,61
        ]);
        }
  
     
      }, 300);
    
  
      return () => {
        clearInterval(intervalId);
      };}
    }, [alienInvaders, direction, gameLost, handleGameOver]);

    useEffect(() => {      

      function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
          const square = squares[alienInvaders[i]];
          if (square instanceof HTMLElement) {
            square.classList.remove('invader');
          }
        }
      }
        const handleKeyDown = (e: KeyboardEvent | null ) => {
            if (e !== null) {
                if (e.key === 'ArrowLeft') {
                    setSpaceshipIndex((prevIndex) => Math.max(prevIndex - 1, 475));
                }
                if (e.key === 'ArrowRight') {
                    setSpaceshipIndex((prevIndex) => Math.min(prevIndex + 1, totalSquares - 1));
                }
                const laserId = setInterval(() => {
                  if (e.key === 'ArrowUp') {
                    setShootLaser(true);
                    if (laserIndex > 25) {
                    setLaserIndex(prevIndex => Math.min(prevIndex - 25, laserIndex));
                    } else {
                      setLaserIndex(spaceshipIndex - 25);
                    }  
                    if (alienInvaders.includes(laserIndex)) {
                      remove();
                      handleScore();
                    }              
                  }
                }, 10);

                window.addEventListener('keyup', () => {
                  clearInterval(laserId);
                  setShootLaser(false);
                });
            }  
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [totalSquares, laserIndex, spaceshipIndex, alienInvaders, handleScore]);


      for (let i = 0; i < totalSquares; i++) {
        let squareClass = 'GameBoard-square';
        let squareId = 'square';
  
        const isInvader = alienInvaders.includes(i);
        const isSpaceship = spaceshipIndex === i;
        const isLaser = laserIndex === i;
  
        if (isInvader && laserIndex !== alienInvaders[i]) {
          squareClass += ' invader';
          squareId = 'invader';
        } else if (isSpaceship) {
          squareClass = 'GameBoard-square spaceship';
          squareId = 'spaceship';
        } else if (shootLaser && isLaser) {
            squareClass = 'GameBoard-square laser';
        } 
  
        squares.push(<div key={i} className={squareClass} data-testid={squareId}></div>);
      }
      
  return (
    <div className="Game-board" data-testid="Game-board">
        {squares}
    </div>
  )
}

export default GameBoard;