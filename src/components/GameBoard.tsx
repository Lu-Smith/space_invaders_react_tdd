import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';

interface GameBoardProps {
    handleGameOver: () => void; // Define the prop type
  }
  

const GameBoard: React.FC<GameBoardProps> = ({ handleGameOver }) => {
    const numRows = 20; 
    const numCols = 25; 
    const totalSquares = numRows * numCols;
    const squares= [];
    const [alienInvaders, setAlienInvaders] = useState([
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,
        26,27,28,29,30,31,32,33,34,35,36,37,
        52,53,54,55,56,57,58,59,60,61
    ])

    const alienInvadersRemoved = [];
    const [spaceshipIndex, setSpaceshipIndex] = useState(487);
    const [direction, setDirection] = useState(1);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent | null ) => {
            if (e !== null) {
                if (e.key === 'ArrowLeft') {
                    setSpaceshipIndex((prevIndex) => Math.max(prevIndex - 1, 475));
                }
                if (e.key === 'ArrowRight') {
                    setSpaceshipIndex((prevIndex) => Math.min(prevIndex + 1, totalSquares - 1));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [totalSquares]);

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Calculate the new positions of alienInvaders
          const newAlienInvaders = [...alienInvaders];
          for (let i = 0; i < newAlienInvaders.length; i++) {
            if (direction === 1) {
              newAlienInvaders[i] += 1;
            } else {
              newAlienInvaders[i] -= 1;
            }
          }
          const r = 0;
          const rightEdge = [r, r+(25*1), r+(25*2), r+(25*3), r+(25*4), r+(25*5), r+(25*6), r+(25*7), r+(25*8), r+(25*9), r+(25*10), r+(25*11), r+(25*12), r+(25*13), r+(25*14), r+(25*15), r+(25*16), r+(25*17), r+(25*18)];
          // Check if they should change direction
          if (newAlienInvaders.some((invader) => rightEdge.includes(invader % numCols))) {
            setDirection((prevDirection) => -prevDirection);
            for (let i = 0; i < newAlienInvaders.length; i++) {
                newAlienInvaders[i] += 25;
            }
        }
          const l = 24;
          const leftEdge = [l, l*2, l*3, l*4, l*5, l*6, l*7, l*8, l*9, l*10, l*11, l*12, l*13, l*14, l*15, l*16, l*17, l*18, l*19];
          if (newAlienInvaders.some((invader) => leftEdge.includes(invader % numCols))) {
            setDirection((prevDirection) => -prevDirection);
            for (let i = 0; i < newAlienInvaders.length; i++) {
                newAlienInvaders[i] += 25;
            }
          }

          if (newAlienInvaders.some((invader) => invader > 475)) {
            handleGameOver(); 
          }
    
          // Update the alienInvaders state
          alienInvadersRemoved.push(...alienInvaders);
          setAlienInvaders(newAlienInvaders);
        }, 100);
    
        return () => {
          clearInterval(intervalId);
        };
      }, alienInvaders);
    
      for (let i = 0; i < totalSquares; i++) {
        const isInvader = alienInvaders.includes(i);
        const isSpaceship = spaceshipIndex === i;
    
        const squareClass = isInvader
          ? 'GameBoard-square invader'
          : isSpaceship
          ? 'GameBoard-square spaceship'
          : 'GameBoard-square';
    
        const squareId = isInvader ? 'invader' : isSpaceship ? 'spaceship' : 'square';
    
        squares.push(<div key={i} className={squareClass} data-testid={squareId}></div>);
      }
      
  return (
    <div className="Game-board" data-testid="Game-board">
        {squares}
    </div>
  )
}

export default GameBoard;