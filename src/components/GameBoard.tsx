import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';

const GameBoard = () => {
    const numRows = 20; 
    const numCols = 25; 
    const totalSquares = numRows * numCols;
    const squares= [];
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,10,11,12, 13,
        26,27,28,29,30,31,32,33,34,35,36,37,
        52,53,54,55,56,57,58,59,60,61
    ]
    const [spaceshipIndex, setSpaceshipIndex] = useState(487);

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