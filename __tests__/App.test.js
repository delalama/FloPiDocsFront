import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.test';

it('renders welcome message', () => {
  render(<App />);
  
  expect(screen.getByText('NEW USER')).toBeInTheDocument();
});