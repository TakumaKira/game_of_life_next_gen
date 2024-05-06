import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('toggles play/pause button correctly', () => {
    const { getByText } = render(<App />);
    const playPauseButton = getByText('▶️');

    fireEvent.click(playPauseButton);
    expect(playPauseButton.textContent).toBe('⏸');

    fireEvent.click(playPauseButton);
    expect(playPauseButton.textContent).toBe('▶️');
  });

  it('renders next frame button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Next Frame')).toBeInTheDocument();
  });

  // You can write more tests to cover other functionalities like fps display, canvas rendering, etc.
});
