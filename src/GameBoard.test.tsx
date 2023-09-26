import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from './components/GameBoard';

test('renders all components', () => {
  render(<GameBoard />);
  
  const squares = screen.getAllByTestId('square');
  expect(squares).toHaveLength(500);
});

test('each square has the correct class', () => {
    render(<GameBoard />);
    const squares = screen.getAllByTestId('square');
    
    squares.forEach((square) => {
      expect(square).toHaveClass('GameBoard-square');
    });
  });