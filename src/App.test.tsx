import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders all components', () => {
  render(<App />);
  
  const headerElement = screen.getByTestId('App-header');
  expect(headerElement).toBeInTheDocument();
  const SpaceInvaders = screen.getByText(/Space Invaders/i);
  expect(SpaceInvaders).toBeInTheDocument();
  const LogoElement = screen.getByAltText(/Space Invader Logo/i);
  expect(LogoElement).toBeInTheDocument();
  const StarElementOne = screen.getByTestId('App-shooting-star-1');
  expect(StarElementOne).toBeInTheDocument();
  const StarElementTwo = screen.getByTestId('App-shooting-star-2');
  expect(StarElementTwo).toBeInTheDocument();
  const StartButton = screen.getByText(/Start/i);
  expect(StartButton).toBeInTheDocument();
});

test('renders game after click at the start button', async () => {
  render(<App />);
  const StartButton = screen.getByText(/Start/i);
  await fireEvent.click(StartButton);

  const headerElement = screen.getByTestId('App-header');
  expect(headerElement).toBeNull();

  const gameDivElement = screen.getByText(/Game Content/i);
  expect(gameDivElement).toBeInTheDocument();
});




