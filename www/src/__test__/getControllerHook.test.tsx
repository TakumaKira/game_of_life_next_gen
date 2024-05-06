import React from 'react';
import { act, renderHook } from '@testing-library/react';
import getControllerHook from '../getControllerHook';
// import { getInterface } from '../game-of-life-next-gen'; // Import necessary functions from game-of-life-next-gen

// Mocking the game-of-life-next-gen module
// jest.mock('../game-of-life-next-gen', () => ({
//   getInterface: jest.fn().mockResolvedValue({
//     play: jest.fn(),
//     pause: jest.fn(),
//     nextFrame: jest.fn(),
//     destroy: jest.fn(),
//   }),
// }));

const mockGetInterface = jest.fn(() => Promise.resolve({
  play: jest.fn(),
  pause: jest.fn(),
  nextFrame: jest.fn(),
  destroy: jest.fn(),
}))

// const mockGetInterface = jest.fn().mockResolvedValue({
//   play: jest.fn(),
//   pause: jest.fn(),
//   nextFrame: jest.fn(),
//   destroy: jest.fn(),
// })

describe('getControllerHook', () => {
  // it('should throw an error if canvasRef is not set', () => {
  //   const { result } = renderHook(() =>
  //     getControllerHook(mockGetInterface, { current: null }, jest.fn(), jest.fn())
  //   );

  //   expect(result.error).toEqual(new Error('Canvas ref not set'));
  // });

  it('should call getInterface with the correct arguments', async () => {
    const canvasRef = { current: document.createElement('canvas') };
    const updatePlayingState = jest.fn();
    const updateFpsData = jest.fn();

    await act(async () => {
      renderHook(() => getControllerHook(mockGetInterface, canvasRef, updatePlayingState, updateFpsData));
    })

    expect(mockGetInterface).toHaveBeenCalledWith(
      canvasRef.current,
      updatePlayingState,
      updateFpsData
    );
  });

  // it('should return functions for play, pause, nextFrame, and destroy', async () => {
  //   const canvasRef = { current: document.createElement('canvas') };
  //   const updatePlayingState = jest.fn();
  //   const updateFpsData = jest.fn();

  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     getControllerHook(mockGetInterface, canvasRef, updatePlayingState, updateFpsData)
  //   );

  //   await waitForNextUpdate(); // Wait for useEffect to complete

  //   const { play, pause, nextFrame, destroy } = result.current;

  //   expect(typeof play).toBe('function');
  //   expect(typeof pause).toBe('function');
  //   expect(typeof nextFrame).toBe('function');
  //   expect(typeof destroy).toBe('function');
  // });

  // Additional tests can be added for the functionality of the returned functions if needed
});
