import React from 'react'

const Game = () => {
  return (
    <div data-testid="Game-component">
      <div className="timer-container" data-testid="timer-container">
        00:00
      </div>
      <div className="score-container" data-testid="score-container">
        score
      </div>
    </div>
  )
}

export default Game
