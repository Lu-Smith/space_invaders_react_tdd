import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './components/Game';

test('renders all components', () => {
  render(<Game />);
  
  const gameHeader = screen.getByTestId('game-header');
  expect(gameHeader).toBeInTheDocument();
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
  const buttonContainer = screen.getByTestId('game-button-container');
  expect(buttonContainer).toBeInTheDocument();
  const buttonElement = screen.getByText('pause');
  expect(buttonElement).toBeInTheDocument();

  const footerComponent = screen.getByTestId('Footer-component');
  expect(footerComponent).toBeInTheDocument();


});
