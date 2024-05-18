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
import { DEFAULT_FIELD_SIZE, DEFAULT_LIFESPAN, DEFAULT_SPEED } from '@/game-of-life-next-gen/constants';

const mockPlay = jest.fn();
const mockPause = jest.fn();
const mockNextFrame = jest.fn();
const mockResetCamera = jest.fn();
const mockToggleGUIControlsVisibility = jest.fn();
const mockDestroy = jest.fn();
const mockRestart = jest.fn();
const mockGetInterface = (getInterface as jest.Mock)
let mockFpsData = 0
const mockGetController = (getController as jest.Mock<ReturnType<typeof getController>, Parameters<typeof getController>>)
  .mockImplementation((getInterface, canvasRef, updatePlayingState, updateFpsData) => ({
    play: mockPlay.mockImplementation(() => updatePlayingState(true)),
    pause: mockPause.mockImplementation(() => updatePlayingState(false)),
    nextFrame: mockNextFrame.mockImplementation(() => updateFpsData({fps: ++mockFpsData, mean: ++mockFpsData, min: ++mockFpsData, max: ++mockFpsData})),
    resetCamera: mockResetCamera,
    toggleGUIControlsVisibility: mockToggleGUIControlsVisibility,
    destroy: mockDestroy,
    restart: mockRestart,
  }))

describe('App component', () => {
  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(mockGetController).toHaveBeenCalledWith(mockGetInterface, {current: expect.any(HTMLCanvasElement)}, expect.any(Function), expect.any(Function), expect.any(Object), expect.any(Boolean))
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

  it('renders show wasm log checkbox', () => {
    const { getByText } = render(<App />);
    const showWasmLogCheckbox = getByText(/Show log from WASM/i);
    expect(showWasmLogCheckbox).toBeInTheDocument();
    expect(mockNextFrame).not.toHaveBeenCalled();
    fireEvent.click(showWasmLogCheckbox);
    const nextFrameButton = getByText('Next Frame');
    fireEvent.click(nextFrameButton);
    expect(mockNextFrame).toHaveBeenCalledWith(false);
  })

  it('renders reset camera button', () => {
    const { getByText } = render(<App />);
    const resetCameraButton = getByText(/Reset Camera/i);
    expect(resetCameraButton).toBeInTheDocument();
    expect(mockResetCamera).not.toHaveBeenCalled();
    fireEvent.click(resetCameraButton);
    expect(mockResetCamera).toHaveBeenCalledTimes(1);
  });

  it('renders toggle GUI controls button', () => {
    const { getByText } = render(<App />);
    const toggleGUIControlsButton = getByText(/Toggle GUI Controls/i);
    expect(toggleGUIControlsButton).toBeInTheDocument();
    expect(mockToggleGUIControlsVisibility).not.toHaveBeenCalled();
    fireEvent.click(toggleGUIControlsButton);
    expect(mockToggleGUIControlsVisibility).toHaveBeenCalledTimes(1);
  });

  it('renders restart button', () => {
    const { getByText } = render(<App />);
    const restartButton = getByText(/^Restart$/i);
    expect(restartButton).toBeInTheDocument();
    expect(mockRestart).toHaveBeenCalledTimes(1); // In this test, `destroy === null` won't stop inital call of restart so it will increase count by 1.
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenCalledTimes(2);
  });

  it('renders change field size button', () => {
    jest.spyOn(window, 'prompt').mockReturnValue((DEFAULT_FIELD_SIZE + 1).toString())
    const { getByText } = render(<App />);
    const changeFieldSizeButton = getByText(/Change field size/i);
    expect(changeFieldSizeButton).toBeInTheDocument();
    expect(mockRestart.mock.calls[0][0]?.fieldSize).toEqual(DEFAULT_FIELD_SIZE) // In this test, `destroy === null` won't stop inital call of restart.
    fireEvent.click(changeFieldSizeButton);
    expect(mockRestart.mock.calls[1][0]?.fieldSize).toEqual(DEFAULT_FIELD_SIZE + 1)
  })

  it('renders change lifespan button', () => {
    jest.spyOn(window, 'prompt').mockReturnValue((DEFAULT_LIFESPAN + 1).toString())
    const { getByText } = render(<App />);
    const changeLifespanButton = getByText(/Change lifespan/i);
    expect(changeLifespanButton).toBeInTheDocument();
    expect(mockRestart.mock.calls[0][0]?.lifespan).toEqual(DEFAULT_LIFESPAN) // In this test, `destroy === null` won't stop inital call of restart.
    fireEvent.click(changeLifespanButton);
    expect(mockRestart.mock.calls[1][0]?.lifespan).toEqual(DEFAULT_LIFESPAN + 1)
  })

  it('renders change speed button', () => {
    jest.spyOn(window, 'prompt').mockReturnValue((DEFAULT_SPEED + 1).toString())
    const { getByText } = render(<App />);
    const changeSpeedButton = getByText(/Change speed/i);
    expect(changeSpeedButton).toBeInTheDocument();
    expect(mockRestart.mock.calls[0][0]?.speed).toEqual(DEFAULT_SPEED) // In this test, `destroy === null` won't stop inital call of restart.
    fireEvent.click(changeSpeedButton);
    expect(mockRestart.mock.calls[1][0]?.speed).toEqual(DEFAULT_SPEED + 1)
  })

  it('renders auto play checkbox', () => {
    const { getByText } = render(<App />);
    const autoplayCheckbox = getByText(/Autoplay/i);
    expect(autoplayCheckbox).toBeInTheDocument();
    expect(mockRestart).toHaveBeenCalledTimes(1); // In this test, `destroy === null` won't stop inital call of restart so it will increase count by 1.
    const restartButton = getByText(/^Restart$/i);
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenLastCalledWith(expect.any(Object), true);
    fireEvent.click(autoplayCheckbox);
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenLastCalledWith(expect.any(Object), false);
  })

  it('renders alive cell base checkboxes', () => {
    const { getByText, rerender } = render(<App />);
    const checkboxes = {
      1: getByText(/^1$/) as HTMLLabelElement,
      2: getByText(/^2$/) as HTMLLabelElement,
      3: getByText(/^3$/) as HTMLLabelElement,
      4: getByText(/^4$/) as HTMLLabelElement,
      5: getByText(/^5$/) as HTMLLabelElement,
      6: getByText(/^6$/) as HTMLLabelElement,
      7: getByText(/^7$/) as HTMLLabelElement,
      8: getByText(/^8$/) as HTMLLabelElement,
      9: getByText(/^9$/) as HTMLLabelElement,
      10: getByText(/^10$/) as HTMLLabelElement,
    }
    expect(mockRestart.mock.calls[0][0]?.aliveCellBase).toEqual([2,7]) // In this test, `destroy === null` won't stop inital call of restart.
    fireEvent.click(checkboxes[1])
    rerender(<App />)
    expect(mockRestart.mock.calls[1][0]?.aliveCellBase).toEqual([1,2,7])
    fireEvent.click(checkboxes[2])
    rerender(<App />)
    expect(mockRestart.mock.calls[2][0]?.aliveCellBase).toEqual([1,7])
    fireEvent.click(checkboxes[3])
    rerender(<App />)
    expect(mockRestart.mock.calls[3][0]?.aliveCellBase).toEqual([1,3,7])
    fireEvent.click(checkboxes[4])
    rerender(<App />)
    expect(mockRestart.mock.calls[4][0]?.aliveCellBase).toEqual([1,3,4,7])
    fireEvent.click(checkboxes[5])
    rerender(<App />)
    expect(mockRestart.mock.calls[5][0]?.aliveCellBase).toEqual([1,3,4,5,7])
    fireEvent.click(checkboxes[6])
    rerender(<App />)
    expect(mockRestart.mock.calls[6][0]?.aliveCellBase).toEqual([1,3,4,5,6,7])
    fireEvent.click(checkboxes[7])
    rerender(<App />)
    expect(mockRestart.mock.calls[7][0]?.aliveCellBase).toEqual([1,3,4,5,6])
    fireEvent.click(checkboxes[8])
    rerender(<App />)
    expect(mockRestart.mock.calls[8][0]?.aliveCellBase).toEqual([1,3,4,5,6,8])
    fireEvent.click(checkboxes[9])
    rerender(<App />)
    expect(mockRestart.mock.calls[9][0]?.aliveCellBase).toEqual([1,3,4,5,6,8,9])
    fireEvent.click(checkboxes[10])
    rerender(<App />)
    expect(mockRestart.mock.calls[10][0]?.aliveCellBase).toEqual([1,3,4,5,6,8,9,10])
  })

  // You can write more tests to cover other functionalities like fps display, canvas rendering, etc.
});
