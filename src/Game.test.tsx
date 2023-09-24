import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

test('renders all components', () => {
  render(<Game />);
  
  const timerElement = screen.getByText('00:00');
  expect(timerElement).toBeInTheDocument();

});
