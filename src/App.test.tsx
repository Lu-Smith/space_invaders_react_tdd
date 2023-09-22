import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo and title components', () => {
  render(<App />);
  const SpaceInvaders = screen.getByText(/Space Invaders/i);
  expect(SpaceInvaders).toBeInTheDocument();
  const LogoElement = screen.getByAltText(/Space Invader Logo/i);
  expect(LogoElement).toBeInTheDocument();
  const StarElementOne = screen.getByTestId('App-shooting-star-1');
  expect(StarElementOne).toBeInTheDocument();
  const StarElementTwo = screen.getByTestId('App-shooting-star-2');
  expect(StarElementTwo).toBeInTheDocument();
});





