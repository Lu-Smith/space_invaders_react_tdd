import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import GameBoard from './components/GameBoard';

test('renders all components', () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
     const gameOver = false;
    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const squares = screen.getAllByTestId('square');
    expect(squares).toHaveLength(463);
});

test('each square has the correct class', () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn()
    const pause = 'pause';
     const gameOver = false;
    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const squares = screen.getAllByTestId('square');
    
    squares.forEach((square) => {
      expect(square).toHaveClass('GameBoard-square');
    });
});

test('renders the correct number of squares', () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
     const gameOver = false;

    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 
    const squares = screen.getAllByTestId('square');
    expect(squares).toHaveLength(463); 
});

test('aliens ivaders are display in GameBoard', () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
     const gameOver = false;

    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const allienInvaders = screen.getAllByTestId('invader');
    expect(allienInvaders).toHaveLength(36);
    
    allienInvaders.forEach((invader) => {
      expect(invader).toHaveClass('invader');
    });
});

test('the spaceship is diplayed in GameBoard', () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
    const gameOver = false;

    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const spaceship = screen.getByTestId('spaceship');
    expect(spaceship).toBeInTheDocument();
    
});

test('move the spaceship in GameBoard after click on left or right arrow', async () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
     const gameOver = false;
    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const spaceshipElement = screen.getAllByTestId('spaceship');

    fireEvent.keyDown(document, { key: 'ArrowLeft' });

    const updatedSpaceshipElement = screen.getByTestId('spaceship');
    expect(updatedSpaceshipElement).not.toEqual(spaceshipElement); 

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowRight' });

    const finalSpaceshipElement = screen.getByTestId('spaceship');
    expect(finalSpaceshipElement).not.toEqual(spaceshipElement); 
    
}); 

test('check if invaders are moving correctly in GameBoard', async () => {
    const handleGameOver = jest.fn(); 
    const handleScore = jest.fn();
    const pause = 'pause';
     const gameOver = false;

    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    jest.useFakeTimers();

    const initialInvaders = screen.getAllByTestId('invader');

    jest.advanceTimersByTime(2000); 
    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const updatedinitialInvaders = screen.getAllByTestId('invader');
    expect(updatedinitialInvaders).not.toEqual(initialInvaders); 

    jest.advanceTimersByTime(2000); 
    render(<GameBoard 
      handleGameOver={handleGameOver} 
      handleScore={handleScore} 
      pause={pause} 
      gameOver={gameOver}/>); 

    const finalinitialInvaders = screen.getAllByTestId('invader');
    expect(finalinitialInvaders).not.toEqual(initialInvaders); 
}); 

beforeEach(() => {
  // Mock timers before each test
  jest.useFakeTimers();
});

afterEach(() => {
  // Restore timers after each test
  jest.useRealTimers();
});