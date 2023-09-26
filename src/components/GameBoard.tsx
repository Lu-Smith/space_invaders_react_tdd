import React from 'react';
import '../styles/GameBoard.css'

const GameBoard = () => {
    const numRows = 20; 
    const numCols = 25; 
    const totalSquares = numRows * numCols;
    const squares = [];

    for (let i = 0; i < totalSquares; i++) {
        squares.push(<div key={i} className="GameBoard-square" data-testId="square"></div>);
    }

  return (
    <div className="Game-board" data-testId="Game-board">
        {squares}
    </div>
  )
}

export default GameBoard