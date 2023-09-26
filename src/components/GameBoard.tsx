import React from 'react';
import '../styles/GameBoard.css'

const GameBoard = () => {
    const numRows = 20; 
    const numCols = 25; 
    const totalSquares = numRows * numCols;
    const squares= [];

    for (let i = 0; i < totalSquares; i++) {
        squares.push(<div key={i} className="GameBoard-square" data-testId="square"></div>);
    }

    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        25,26,27,28,29,30,31,32,33,34,
        50,51,52,53,54,55,56,57,58,59
      ]
      
  return (
    <div className="Game-board" data-testId="Game-board">
        {squares}
    </div>
  )
}

export default GameBoard