import togglePlayPauseImpl from '../togglePlayPauseImpl'; // Adjust the import path as necessary
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import { pause, play } from "@/game-of-life-next-gen/anim-controller";
import type { AnimationState } from "@/game-of-life-next-gen/anim-controller";

// Mock dependencies
jest.mock('@/game-of-life-next-gen/anim-controller', () => ({
  pause: jest.fn().mockReturnValue({ isPlaying: false }),
  play: jest.fn().mockReturnValue({ isPlaying: true }),
}));

// Mock FPS and Universe objects
const fpsMock = { /* Mock FPS object properties */ } as FPS;
const universeMock = { /* Mock Universe object properties */ } as Universe;
const memoryMock = { /* Mock Memory object properties */ } as WebAssembly.Memory;
const animationStateMock = { isPlaying: false };

describe('togglePlayPauseImpl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should play when game is paused', () => {
    // Mock animationStateMock.isPlaying to return false
    animationStateMock.isPlaying = false;

    // Mock updateTextureContext function
    const updateUniverseMock = jest.fn();

    togglePlayPauseImpl(
      fpsMock,
      universeMock,
      updateUniverseMock,
      animationStateMock as AnimationState,
      1, // speed
    );

    expect(play).toHaveBeenCalledWith(
      fpsMock,
      universeMock,
      updateUniverseMock,
      animationStateMock,
      1, // speed
    );
    expect(pause).not.toHaveBeenCalled();
  });

  test('should pause when game is playing', () => {
    // Mock animationStateMock.isPlaying to return false
    animationStateMock.isPlaying = true;

    togglePlayPauseImpl(
      fpsMock,
      universeMock,
      jest.fn(), // Mock updateTextureContext function
      animationStateMock as AnimationState,
      1, // speed
    );

    expect(pause).toHaveBeenCalledWith(animationStateMock);
    expect(play).not.toHaveBeenCalled();
  });
});
