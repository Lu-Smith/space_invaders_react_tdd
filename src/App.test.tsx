import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders all components', () => {
  render(<App />);
  const SpaceInvaders = screen.getByText(/Space Invaders/i);
  expect(SpaceInvaders).toBeInTheDocument();
});
