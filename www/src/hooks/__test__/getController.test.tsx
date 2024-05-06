import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import getController from '../getController';
import type { OnUpdateFpsDataFn, OnUpdatePlayingStateFn, getInterface as getInterfaceType } from '@/game-of-life-next-gen';

describe('getController', () => {
  let mockCanvasRef: React.RefObject<HTMLCanvasElement>;
  let mockUpdatePlayingStateFn: OnUpdatePlayingStateFn;
  let mockUpdateFpsDataFn: OnUpdateFpsDataFn;

  beforeEach(() => {
    mockCanvasRef = { current: document.createElement('canvas') };
    mockUpdatePlayingStateFn = jest.fn();
    mockUpdateFpsDataFn = jest.fn();
  });

  it('should call getInterface and set state correctly', async () => {
    const mockPlay = jest.fn();
    const mockPause = jest.fn();
    const mockNextFrame = jest.fn();
    const mockDestroy = jest.fn();
    const mockGetInterface = jest.fn().mockResolvedValue({
      play: mockPlay,
      pause: mockPause,
      nextFrame: mockNextFrame,
      destroy: mockDestroy,
    });
    const result = renderHook(() => getController(mockGetInterface, mockCanvasRef, mockUpdatePlayingStateFn, mockUpdateFpsDataFn));
    await result.waitForNextUpdate();
    expect(mockGetInterface).toHaveBeenCalledWith(mockCanvasRef.current, mockUpdatePlayingStateFn, mockUpdateFpsDataFn);
    expect(result.result.current.play).toEqual(mockPlay);
    expect(result.result.current.pause).toEqual(mockPause);
    expect(result.result.current.nextFrame).toEqual(mockNextFrame);
    expect(result.result.current.destroy).toEqual(mockDestroy);
  });

  it('should call destroy function on unmount', async () => {
    const mockPlay = jest.fn();
    const mockPause = jest.fn();
    const mockNextFrame = jest.fn();
    const mockDestroy = jest.fn();
    const mockGetInterface = jest.fn().mockResolvedValue({
      play: mockPlay,
      pause: mockPause,
      nextFrame: mockNextFrame,
      destroy: mockDestroy,
    });
    const result = renderHook(() => getController(mockGetInterface, mockCanvasRef, mockUpdatePlayingStateFn, mockUpdateFpsDataFn));
    await result.waitForNextUpdate();
    result.unmount()
    expect(mockDestroy).toHaveBeenCalled();
  });
});
