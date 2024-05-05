// Mocking dependencies
const mockWasmModule = { memory: {} }
jest.mock('wasm-game-of-life/wasm_game_of_life_bg.wasm', () =>
  jest.fn().mockResolvedValue(mockWasmModule)
);
const mockBg = {
  __esModule: true,
  __wbg_set_wasm: jest.fn()
}
jest.mock('wasm-game-of-life/wasm_game_of_life_bg.js', () => mockBg);
const mockOnTogglePlayPause = jest.fn();
const mockAnimationState = jest.fn();
const mockOnNextFrame = jest.fn();
const mockOnClickCanvasFnRef = jest.fn();
const mockDestroy = jest.fn();
jest.mock('../../setup', () => jest.fn().mockReturnValue({
  onTogglePlayPause: mockOnTogglePlayPause,
  animationState: mockAnimationState,
  onNextFrame: mockOnNextFrame,
  onClickCanvasFnRef: mockOnClickCanvasFnRef,
  destroy: mockDestroy
}));
const mockOnDestroy = jest.fn();
jest.mock('../../onDestroy', () => mockOnDestroy);
const mockPlayImpl = jest.fn();
jest.mock('../playImpl', () => mockPlayImpl)
const mockPauseImpl = jest.fn();
jest.mock('../pauseImpl', () => mockPauseImpl)
const mockNextFrameImpl = jest.fn();
jest.mock('../nextFrameImpl', () => mockNextFrameImpl)
const mockDestroyImpl = jest.fn();
jest.mock('../destroyImpl', () => mockDestroyImpl)

import type { UpdateFpsDataFn } from '@/game-of-life-next-gen/game-of-life';
import getInterface from '../getInterface';
import buildWasmModule from 'wasm-game-of-life/wasm_game_of_life_bg.wasm';
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

describe('getInterface', () => {
  let canvas: HTMLCanvasElement;
  let updatePlayingState: (isPlaying: boolean) => void;
  let updateFpsData: UpdateFpsDataFn;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
  });

  test('setup wasm correctly', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(buildWasmModule).toHaveBeenCalledWith({'./wasm_game_of_life_bg.js': mockBg});
    expect(bg.__wbg_set_wasm).toHaveBeenCalledWith(mockWasmModule)
  })

  test('returns an object with play, pause, nextFrame, and destroy functions', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(gameInterface).toEqual(expect.objectContaining({
      play: expect.any(Function),
      pause: expect.any(Function),
      nextFrame: expect.any(Function),
      destroy: expect.any(Function)
    }));
  });

  test('setup called with correct arguments', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(require('../../setup')).toHaveBeenCalledWith(
      canvas,
      updatePlayingState,
      updateFpsData,
      mockWasmModule.memory,
    );
  });

  test('play function calls playImpl', async () => {
    const autoStartNeedsToBeFalse = false;
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, autoStartNeedsToBeFalse);
    expect(mockPlayImpl).not.toHaveBeenCalled();
    gameInterface.play();
    expect(mockPlayImpl).toHaveBeenCalledWith(mockOnTogglePlayPause, mockAnimationState, { isDestroyed: false });
  });

  test('pause function calls pauseImpl', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(mockPauseImpl).not.toHaveBeenCalled();
    gameInterface.pause();
    expect(mockPauseImpl).toHaveBeenCalledWith(mockOnTogglePlayPause, mockAnimationState, { isDestroyed: false });
  });

  test('nextFrame function calls nextFrameImpl', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(mockNextFrameImpl).not.toHaveBeenCalled();
    gameInterface.nextFrame();
    expect(mockNextFrameImpl).toHaveBeenCalledWith(mockOnNextFrame, mockAnimationState, { isDestroyed: false });
  });

  test('destroy function calls destroyImpl', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(mockDestroyImpl).not.toHaveBeenCalled();
    gameInterface.destroy();
    expect(mockDestroyImpl).toHaveBeenCalledWith(expect.any(Function), { isDestroyed: false });
  });

  test('play function is called automatically if autoStart is true', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(mockPlayImpl).toHaveBeenCalled();
  });

  // Add other tests for play, pause, nextFrame, and destroy functions
  // Test each function's behavior, possibly using Jest's mocking capabilities
});
