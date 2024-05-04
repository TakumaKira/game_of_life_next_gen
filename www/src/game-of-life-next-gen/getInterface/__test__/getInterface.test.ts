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
jest.mock('../../setup', () => jest.fn().mockReturnValue({
  onTogglePlayPause: jest.fn(),
  getIsPlaying: jest.fn(),
  onNextFrame: jest.fn(),
  onClickCanvasFnRef: jest.fn(),
  dispose: jest.fn()
}));
jest.mock('../../onDestroy', () => jest.fn());
jest.mock('../playImpl', () => jest.fn())
jest.mock('../pauseImpl', () => jest.fn())
jest.mock('../nextFrameImpl', () => jest.fn())
jest.mock('../destroyImpl', () => jest.fn())

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
      expect.any(Function),
      expect.any(Function)
    );
  });

  // Add other tests for play, pause, nextFrame, and destroy functions
  // Test each function's behavior, possibly using Jest's mocking capabilities
});
