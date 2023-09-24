import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './components/Game';

test('renders all components', () => {
  render(<Game />);
  
  const timerContainer = screen.getByTestId('timer-container');
  expect(timerContainer).toBeInTheDocument();
  const timerElement = screen.getByText('00:00');
  expect(timerElement).toBeInTheDocument();


});
