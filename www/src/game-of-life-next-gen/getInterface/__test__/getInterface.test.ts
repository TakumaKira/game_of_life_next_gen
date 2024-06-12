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
const mockTogglePlayPause = jest.fn();
const mockAnimationState = jest.fn();
const mockNextFrame = jest.fn();
const mockOnClickCanvasFnRef = jest.fn();
const mockResetCamera = jest.fn();
const mockUpdateColors = jest.fn();
const mockUpdateEffects = jest.fn();
const mockDestroy = jest.fn();
jest.mock('../../setup', () => jest.fn().mockReturnValue({
  togglePlayPause: mockTogglePlayPause,
  animationState: mockAnimationState,
  nextFrame: mockNextFrame,
  onClickCanvasFnRef: mockOnClickCanvasFnRef,
  resetCamera: mockResetCamera,
  updateColors: mockUpdateColors,
  updateEffects: mockUpdateEffects,
  destroy: mockDestroy
}));
const mockPlayImpl = jest.fn();
jest.mock('../playImpl', () => mockPlayImpl)
const mockPauseImpl = jest.fn();
jest.mock('../pauseImpl', () => mockPauseImpl)
const mockNextFrameImpl = jest.fn();
jest.mock('../nextFrameImpl', () => mockNextFrameImpl)
const mockDestroyImpl = jest.fn();
jest.mock('../destroyImpl', () => mockDestroyImpl)
const mockDestroyedStateConstructor = jest.fn();
class MockDestroyedState {
  constructor() {
    mockDestroyedStateConstructor()
  }
}
jest.mock('../DestroyedState', () => MockDestroyedState)

import type { OnUpdateFpsDataFn } from '@/game-of-life-next-gen/game-of-life';
import getInterface from '../getInterface';
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { OnUpdatePlayingStateFn } from '@/game-of-life-next-gen/anim-controller';
import type { UniverseConfig } from '@/game-of-life-next-gen';

describe('getInterface', () => {
  let canvas: HTMLCanvasElement;
  let updatePlayingState: OnUpdatePlayingStateFn;
  let updateFpsData: OnUpdateFpsDataFn;
  let universeConfig: UniverseConfig;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
    universeConfig = {};
  });

  test('setup wasm correctly', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(bg.__wbg_set_wasm).toHaveBeenCalledWith(mockWasmModule)
  })

  test('returns an object with play, pause, nextFrame, resetCamera, toggleGUIControlsVisibility, and destroy functions', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(gameInterface).toEqual(expect.objectContaining({
      play: expect.any(Function),
      pause: expect.any(Function),
      nextFrame: expect.any(Function),
      resetCamera: expect.any(Function),
      updateColors: expect.any(Function),
      updateEffects: expect.any(Function),
      destroy: expect.any(Function)
    }));
  });

  test('setup called with correct arguments', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(require('../../setup')).toHaveBeenCalledWith(
      canvas,
      updatePlayingState,
      updateFpsData,
      mockWasmModule.memory,
      universeConfig,
    );
  });

  test('play function calls playImpl with correct arguments', async () => {
    const autoStartNeedsToBeFalse = false;
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, autoStartNeedsToBeFalse, universeConfig);
    expect(mockPlayImpl).not.toHaveBeenCalled();
    gameInterface.play();
    expect(mockPlayImpl).toHaveBeenCalledWith(mockTogglePlayPause, mockAnimationState, new MockDestroyedState());
  });

  test('pause function calls pauseImpl with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockPauseImpl).not.toHaveBeenCalled();
    gameInterface.pause();
    expect(mockPauseImpl).toHaveBeenCalledWith(mockTogglePlayPause, mockAnimationState, new MockDestroyedState());
  });

  test('nextFrame function calls nextFrameImpl with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockNextFrameImpl).not.toHaveBeenCalled();
    gameInterface.nextFrame();
    expect(mockNextFrameImpl).toHaveBeenCalledWith(mockNextFrame, mockAnimationState, new MockDestroyedState(), undefined);
  });

  test('resetCamera function calls nextFrameImpl with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockResetCamera).not.toHaveBeenCalled();
    gameInterface.resetCamera();
    expect(mockResetCamera).toHaveBeenCalled();
  });

  test('updateColors function calls setup().updateColors with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockUpdateColors).not.toHaveBeenCalled();
    const textureColorsNullable = { gridColor: '#000000ff' }
    gameInterface.updateColors(textureColorsNullable);
    expect(mockUpdateColors).toHaveBeenCalledWith(textureColorsNullable);
  });

  test('updateEffects function calls setup().updateEffects with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockUpdateEffects).not.toHaveBeenCalled();
    const glValues = { fxaaEnabled: true }
    gameInterface.updateEffects(glValues);
    expect(mockUpdateEffects).toHaveBeenCalledWith(glValues);
  });

  test('destroy function calls destroyImpl with correct arguments', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockDestroyImpl).not.toHaveBeenCalled();
    gameInterface.destroy();
    expect(mockDestroyImpl).toHaveBeenCalledWith(mockOnClickCanvasFnRef, canvas, mockAnimationState, mockDestroy, new MockDestroyedState());
  });

  test('play function is called automatically if autoStart is true', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData, undefined, universeConfig);
    expect(mockPlayImpl).toHaveBeenCalled();
  });

  test('nextFrameImpl function is called automatically with correnct arguments if autoStart is false', async () => {
    await getInterface(canvas, updatePlayingState, updateFpsData, false, universeConfig);
    expect(mockNextFrameImpl).toHaveBeenCalledWith(mockNextFrame, mockAnimationState, new MockDestroyedState());
  });

  // Add other tests for play, pause, nextFrame, and destroy functions
  // Test each function's behavior, possibly using Jest's mocking capabilities
});
