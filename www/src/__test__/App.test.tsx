import React from 'react';
import { render, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import type { OnUpdateFpsDataFn } from '@/game-of-life-next-gen/game-of-life';
import type { getInterface, OnUpdatePlayingStateFn } from '@/game-of-life-next-gen';

// jest.useFakeTimers();

const mockPlay = jest.fn();
const mockPause = jest.fn();
const mockNextFrame = jest.fn();
const mockDestroy = jest.fn();
// const promise = (updatePlayingState: OnUpdatePlayingStateFn) => new Promise(resolve => {
//   resolve({
//     play: mockPlay.mockImplementation(() => updatePlayingState(true)),
//     pause: mockPause.mockImplementation(() => updatePlayingState(false)),
//     nextFrame: mockNextFrame,
//     destroy: mockDestroy,
//   })
// })
// jest.mock('@/game-of-life-next-gen', () => ({
//   getInterface: jest.fn().mockImplementation((canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, autoStart = true) => {
//     // jest.advanceTimersToNextTimer();
//     updatePlayingState(autoStart);
//     return promise(updatePlayingState)
//   }),
// }));

test('renders without crashing', async () => {
  // let resolveRef: (value: Awaited<ReturnType<typeof getInterface>>) => void = () => {};
  // let argsRef: Parameters<typeof getInterface>;
  // const mockGetInterface: typeof getInterface = (...args) => new Promise(resolve => {
  //   argsRef = args
  //   resolveRef = resolve
  // })
  const mockGetInterface = jest.fn().mockImplementation((...args: Parameters<typeof getInterface>) => {
    return new Promise(resolve => {
      // argsRef = args
      // resolveRef = resolve
      resolve({
        play: mockPlay.mockImplementation(() => args[1](true)),
        pause: mockPause.mockImplementation(() => args[1](false)),
        nextFrame: mockNextFrame,
        destroy: mockDestroy,
      });
    })
  })
  render(<App handleGetInterface={mockGetInterface} />);
  expect(mockGetInterface).toHaveBeenCalledTimes(1);
  // await act(() => {
  //   resolveRef({
  //     play: mockPlay.mockImplementation(() => argsRef?.[1]?.(true)),
  //     pause: mockPause.mockImplementation(() => argsRef?.[1]?.(false)),
  //     nextFrame: mockNextFrame,
  //     destroy: mockDestroy,
  //   });
  // })
});

// test('play/pause button toggles play state', async () => {
//   const screen = render(<App />);
//   const playPauseButton = await screen.findByText('⏸')
//   // act(() => {
//   //   fireEvent.click(playPauseButton);
//   // })
//   // await waitFor(() => {
//   //   expect(playPauseButton).toBeInTheDocument();
//   //   expect(mockPlay).not.toHaveBeenCalled();
//   //   expect(mockPause).toHaveBeenCalledTimes(1);
//   // });

//   // act(() => {
//   //   fireEvent.click(playPauseButton);
//   // })
//   // await waitFor(() => {
//   //   expect(playPauseButton).toBeInTheDocument();
//   //   expect(mockPlay).toHaveBeenCalledTimes(1);
//   //   expect(mockPause).toHaveBeenCalledTimes(1);
//   // });
// });

// test('next frame button triggers next frame function', async () => {
//   const { getByText } = render(<App />);
//   const nextFrameButton = getByText('Next Frame');

//   expect(mockNextFrame).not.toHaveBeenCalled();
//   fireEvent.click(nextFrameButton);
//   await waitFor(() => {
//     expect(mockNextFrame).toHaveBeenCalledTimes(1);
//   });
//   // Add assertions based on the expected behavior after clicking the next frame button
// });

// Similarly, write tests for other functionalities like destroy button, state changes, useEffect hook, etc.
