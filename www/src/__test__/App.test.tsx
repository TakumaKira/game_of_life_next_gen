import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('@/game-of-life-next-gen', () => ({
  getInterface: jest.fn().mockResolvedValue({
    play: jest.fn(),
    pause: jest.fn(),
    nextFrame: jest.fn(),
    destroy: jest.fn(),
  }),
}));

test('renders without crashing', () => {
  render(<App />);
});

test('play/pause button toggles play state', async () => {
  const { getByText } = render(<App />);
  const playPauseButton = getByText('▶️'); // Assuming play button is initially displayed

  fireEvent.click(playPauseButton);
  await waitFor(() => {
    expect(playPauseButton.textContent).toBe('⏸');
  });

  fireEvent.click(playPauseButton);
  await waitFor(() => {
    expect(playPauseButton.textContent).toBe('▶️');
  });
});

test('next frame button triggers next frame function', async () => {
  const { getByText } = render(<App />);
  const nextFrameButton = getByText('Next Frame');

  fireEvent.click(nextFrameButton);
  // Add assertions based on the expected behavior after clicking the next frame button
});

// Similarly, write tests for other functionalities like destroy button, state changes, useEffect hook, etc.
