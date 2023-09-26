import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from './components/GameBoard';

test('renders all components', () => {
  render(<GameBoard />);
  
  const squares = screen.getAllByTestId('square');
  expect(squares).toHaveLength(464);
});

test('each square has the correct class', () => {
    render(<GameBoard />);
    const squares = screen.getAllByTestId('square');
    
    squares.forEach((square) => {
      expect(square).toHaveClass('GameBoard-square');
    });
});

test('alins ivaders are display in GameBoard', () => {
    render(<GameBoard />);
    const allienInvaders = screen.getAllByTestId('invader');
    expect(allienInvaders).toHaveLength(36);
    
    allienInvaders.forEach((invader) => {
      expect(invader).toHaveClass('invader');
    });
});