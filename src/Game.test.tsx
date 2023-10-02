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
  const scoreElement = screen.getByText('Score: 0');
  expect(scoreElement).toBeInTheDocument();
  const gameContainer = screen.getByTestId('game-container');
  expect(gameContainer).toBeInTheDocument();
  const GameBoardComponent = screen.getByTestId('Game-board');
  expect(GameBoardComponent).toBeInTheDocument();
  const buttonContainer = screen.getByTestId('game-button');
  expect(buttonContainer).toBeInTheDocument();
  const buttonElement = screen.getByText('pause');
  expect(buttonElement).toBeInTheDocument();

  const FooterComponent = screen.getByTestId('Footer-component');
  expect(FooterComponent).toBeInTheDocument();
});

test('handles the game button correctly', () => {
  render(<Game />);
  const gameButton = screen.getByTestId('game-button');
  fireEvent.click(gameButton);
  expect(gameButton).toHaveTextContent('play');
    
});

test('handles the timer correctly', () => {
  render(<Game />);
  const gameButton = screen.getByTestId('game-button');
  const timerContainer = screen.getByTestId('timer-container');

  setTimeout(() => {
    fireEvent.click(gameButton); // Pause the timer 
    const timerText = timerContainer.textContent;
    expect(timerText).toMatch(/\d{2}:\d{2}/); // Should match HH:MM format
  }, 2000); 
});
