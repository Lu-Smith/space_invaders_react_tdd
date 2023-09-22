import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo and title components', () => {
  render(<App />);
  const SpaceInvaders = screen.getByText(/Space Invaders/i);
  expect(SpaceInvaders).toBeInTheDocument();
  const LogoElement = screen.getByAltText(/Space Invader Logo/i);
  expect(LogoElement).toBeInTheDocument();
});
