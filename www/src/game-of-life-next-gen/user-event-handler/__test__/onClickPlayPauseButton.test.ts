import onClickPlayPauseButton from '../onClickPlayPauseButton'; // Adjust the import path as necessary
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import { isPaused, pause, play } from "@/game-of-life-next-gen/anim-controller";

// Mock dependencies
jest.mock('@/game-of-life-next-gen/anim-controller', () => ({
  isPaused: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(),
}));

// Mock FPS and Universe objects
const fpsMock = { /* Mock FPS object properties */ } as FPS;
const universeMock = { /* Mock Universe object properties */ } as Universe;
const memoryMock = { /* Mock Memory object properties */ } as WebAssembly.Memory;

describe('onClickPlayPauseButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should play when game is paused', () => {
    // Mock isPaused to return true
    (isPaused as jest.Mock).mockReturnValue(true);

    // Mock updateTextureContext function
    const updateTextureContextMock = jest.fn();

    // Mock updateAnimId function
    const updateAnimIdMock = jest.fn();

    const result = onClickPlayPauseButton(
      fpsMock,
      universeMock,
      memoryMock,
      updateTextureContextMock,
      100, // Width
      100, // Height
      1000, // lifeSpan
      () => null, // getCurrentAnimId
      updateAnimIdMock
    );

    expect(result.isPlaying).toBe(true);
    expect(isPaused).toHaveBeenCalledWith(expect.any(Function));
    expect(play).toHaveBeenCalledWith(
      fpsMock,
      universeMock,
      memoryMock,
      updateTextureContextMock,
      100, // Width
      100, // Height
      1000, // lifeSpan
      updateAnimIdMock
    );
    expect(pause).not.toHaveBeenCalled();
  });

  test('should pause when game is playing', () => {
    // Mock isPaused to return false
    (isPaused as jest.Mock).mockReturnValue(false);

    // Mock getCurrentAnimId function
    const getCurrentAnimIdMock = jest.fn().mockReturnValue(123);

    // Mock updateAnimId function
    const updateAnimIdMock = jest.fn();

    const result = onClickPlayPauseButton(
      fpsMock,
      universeMock,
      memoryMock,
      jest.fn(), // Mock updateTextureContext function
      100, // Width
      100, // Height
      1000, // lifeSpan
      getCurrentAnimIdMock,
      updateAnimIdMock
    );

    expect(result.isPlaying).toBe(false);
    expect(isPaused).toHaveBeenCalledWith(expect.any(Function));
    expect(pause).toHaveBeenCalledWith(
      getCurrentAnimIdMock,
      updateAnimIdMock
    );
    expect(play).not.toHaveBeenCalled();
  });
});
