import type { UpdateFpsDataFn } from '@/game-of-life-next-gen/game-of-life';
import getInterface from '../getInterface';

// Mocking dependencies
jest.mock('wasm-game-of-life/wasm_game_of_life_bg.wasm', () => ({ default: jest.fn() }));
jest.mock('wasm-game-of-life/wasm_game_of_life_bg.js', () => ({ __wbg_set_wasm: jest.fn() }));
jest.mock('../../setup', () => ({ 
  __esModule: true,
  default: jest.fn(() => ({
    onTogglePlayPause: jest.fn(),
    getIsPlaying: jest.fn(),
    onNextFrame: jest.fn(),
    onClickCanvasFnRef: jest.fn(),
    dispose: jest.fn()
  }))
}));
jest.mock('../../onDestroy', () => jest.fn());

describe('getInterface', () => {
  let canvas: HTMLCanvasElement;
  let updatePlayingState: (isPlaying: boolean) => void;
  let updateFpsData: UpdateFpsDataFn;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
  });

  test('returns an object with play, pause, nextFrame, and destroy functions', async () => {
    const gameInterface = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(gameInterface).toEqual(expect.objectContaining({
      play: expect.any(Function),
      pause: expect.any(Function),
      nextFrame: expect.any(Function),
      destroy: expect.any(Function)
    }));
  });

  // Add other tests for play, pause, nextFrame, and destroy functions
  // Test each function's behavior, possibly using Jest's mocking capabilities
});
