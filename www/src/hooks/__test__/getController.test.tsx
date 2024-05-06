import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import getController from './getController';

jest.mock('./getInterface'); // assuming the module path is correct

describe('getController', () => {
  let canvasRef;
  let updatePlayingStateFn;
  let updateFpsDataFn;

  beforeEach(() => {
    canvasRef = { current: document.createElement('canvas') };
    updatePlayingStateFn = jest.fn();
    updateFpsDataFn = jest.fn();
  });

  it('should call getInterface and set state correctly', async () => {
    const mockGetInterface = jest.fn().mockResolvedValue({
      play: jest.fn(),
      pause: jest.fn(),
      nextFrame: jest.fn(),
      destroy: jest.fn(),
    });

    await act(async () => {
      render(<TestComponent getInterface={mockGetInterface} />);
    });

    expect(mockGetInterface).toHaveBeenCalledWith(canvasRef.current, updatePlayingStateFn, updateFpsDataFn);
    expect(document.querySelector('#play')).toBeInTheDocument();
    expect(document.querySelector('#pause')).toBeInTheDocument();
    expect(document.querySelector('#nextFrame')).toBeInTheDocument();
    expect(document.querySelector('#destroy')).toBeInTheDocument();
  });

  it('should call destroy function on unmount', async () => {
    const mockDestroy = jest.fn();
    jest.doMock('./getInterface', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({
        play: jest.fn(),
        pause: jest.fn(),
        nextFrame: jest.fn(),
        destroy: mockDestroy,
      }),
    }));

    const { unmount } = render(<TestComponent getInterface={() => {}} />);
    unmount();

    expect(mockDestroy).toHaveBeenCalled();
  });
});

function TestComponent({ getInterface }) {
  const controller = getController(getInterface, canvasRef, updatePlayingStateFn, updateFpsDataFn);

  return (
    <>
      <button id="play" onClick={controller.play}></button>
      <button id="pause" onClick={controller.pause}></button>
      <button id="nextFrame" onClick={controller.nextFrame}></button>
      <button id="destroy" onClick={controller.destroy}></button>
    </>
  );
}
