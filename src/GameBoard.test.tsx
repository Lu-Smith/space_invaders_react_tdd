import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from './components/GameBoard';

test('renders all components', () => {
  render(<GameBoard />);
  
  const squares = screen.getAllByTestId('square');
  expect(squares).toHaveLength(463);
});

test('each square has the correct class', () => {
    render(<GameBoard />);
    const squares = screen.getAllByTestId('square');
    
    squares.forEach((square) => {
      expect(square).toHaveClass('GameBoard-square');
    });
});

test('aliens ivaders are display in GameBoard', () => {
    render(<GameBoard />);
    const allienInvaders = screen.getAllByTestId('invader');
    expect(allienInvaders).toHaveLength(36);
    
    allienInvaders.forEach((invader) => {
      expect(invader).toHaveClass('invader');
    });
});

test('the spaceship is diplayed in GameBoard', () => {
    render(<GameBoard />);
    const spaceship = screen.getByTestId('spaceship');
    expect(spaceship).toBeInTheDocument();
    
});

test('move the spaceship in GameBoard after click on left or right arrow', async () => {
    render(<GameBoard />);
  
    const spaceshipElement = screen.getAllByTestId('spaceship');
  
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
  
    const updatedSpaceshipElement = screen.getByTestId('spaceship');
    expect(updatedSpaceshipElement).not.toEqual(spaceshipElement); 
  
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowRight' });

    const finalSpaceshipElement = screen.getByTestId('spaceship');
    expect(finalSpaceshipElement).not.toEqual(spaceshipElement); 
    
});