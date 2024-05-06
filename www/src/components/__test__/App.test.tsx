// Mocking getInterface and getController
jest.mock('@/game-of-life-next-gen', () => ({
  getInterface: jest.fn(),
}));
jest.mock('@/hooks', () => ({
  getController: jest.fn(),
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import { getInterface } from '@/game-of-life-next-gen'
import { getController } from '@/hooks';

const mockPlay = jest.fn();
const mockPause = jest.fn();
const mockNextFrame = jest.fn();
const mockDestroy = jest.fn();
const mockGetInterface = (getInterface as jest.Mock)
let mockFpsData = 0
const mockGetController = (getController as jest.Mock<ReturnType<typeof getController>, Parameters<typeof getController>>)
  .mockImplementation((getInterface, canvasRef, updatePlayingState, updateFpsData) => ({
    play: mockPlay.mockImplementation(() => updatePlayingState(true)),
    pause: mockPause.mockImplementation(() => updatePlayingState(false)),
    nextFrame: mockNextFrame.mockImplementation(() => updateFpsData({fps: ++mockFpsData, mean: ++mockFpsData, min: ++mockFpsData, max: ++mockFpsData})),
    destroy: mockDestroy,
  }))

describe('App component', () => {
  afterAll(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(mockGetController).toHaveBeenCalledWith(mockGetInterface, {current: expect.any(HTMLCanvasElement)}, expect.any(Function), expect.any(Function))
  });

  it('toggles play/pause button correctly', () => {
    const { getByText } = render(<App />);
    const playPauseButton = getByText('▶️');
    expect(mockPlay).not.toHaveBeenCalled();
    expect(mockPause).not.toHaveBeenCalled();

    fireEvent.click(playPauseButton);
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPause).not.toHaveBeenCalled();
    expect(playPauseButton.textContent).toBe('⏸');

    fireEvent.click(playPauseButton);
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPause).toHaveBeenCalledTimes(1);
    expect(playPauseButton.textContent).toBe('▶️');
  });

  it('renders next frame button', () => {
    const { getByText } = render(<App />);
    const nextFrameButton = getByText('Next Frame');
    expect(nextFrameButton).toBeInTheDocument();
    expect(mockNextFrame).not.toHaveBeenCalled();
    fireEvent.click(nextFrameButton);
    expect(mockNextFrame).toHaveBeenCalledTimes(1);
    expect(getByText(/Frames per Second:/)).toBeInTheDocument();    
    expect(getByText(/latest = 1/)).toBeInTheDocument();    
    expect(getByText(/avg of last 100 = 2/)).toBeInTheDocument();    
    expect(getByText(/min of last 100 = 3/)).toBeInTheDocument();    
    expect(getByText(/max of last 100 = 4/)).toBeInTheDocument();    
  });

  it('renders destroy button', () => {
    const { getByText } = render(<App />);
    const destroyButton = getByText('Destroy');
    expect(destroyButton).toBeInTheDocument();
    expect(mockDestroy).not.toHaveBeenCalled();
    fireEvent.click(destroyButton);
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });

  // You can write more tests to cover other functionalities like fps display, canvas rendering, etc.
});
