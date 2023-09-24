import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './components/Game';

test('renders all components', () => {
  render(<Game />);
  
  const timerContainer = screen.getByTestId('timer-container');
  expect(timerContainer).toBeInTheDocument();
  const timerElement = screen.getByText('00:00');
  expect(timerElement).toBeInTheDocument();
  const scoreContainer = screen.getByTestId('score-container');
  expect(scoreContainer).toBeInTheDocument();
  const scoreElement = screen.getByText('score');
  expect(scoreElement).toBeInTheDocument();
  const gameContainer = screen.getByTestId('game-container');
  expect(gameContainer).toBeInTheDocument();
  const gameElement = screen.getByText('game');
  expect(gameElement).toBeInTheDocument();


});
