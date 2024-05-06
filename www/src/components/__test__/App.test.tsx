import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

// Mocking getInterface and getController
jest.mock('@/game-of-life-next-gen', () => ({
  getInterface: jest.fn(),
}));
jest.mock('@/hooks', () => ({
  getController: jest.fn().mockImplementation((getInterface, canvasRef, updatePlayingState, updateFpsData) => ({
    play: jest.fn().mockImplementation(() => updatePlayingState(true)),
    pause: jest.fn().mockImplementation(() => updatePlayingState(false)),
    nextFrame: jest.fn(),
    destroy: jest.fn(),
  })),
}));

describe('App component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

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
