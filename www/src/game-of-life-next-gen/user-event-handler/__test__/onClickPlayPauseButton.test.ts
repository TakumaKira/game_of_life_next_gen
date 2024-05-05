import onClickPlayPauseButton from '../onClickPlayPauseButton'; // Adjust the import path as necessary
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

describe('onClickPlayPauseButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should play when game is paused', () => {
    // Mock animationStateMock.isPlaying to return false
    animationStateMock.isPlaying = false;

    // Mock updateTextureContext function
    const updateTextureContextMock = jest.fn();

    // Mock updateAnimId function
    const updateAnimIdMock = jest.fn();

    onClickPlayPauseButton(
      fpsMock,
      universeMock,
      memoryMock,
      updateTextureContextMock,
      100, // Width
      100, // Height
      1000, // lifeSpan
      animationStateMock as AnimationState
    );

    expect(play).toHaveBeenCalledWith(
      fpsMock,
      universeMock,
      memoryMock,
      updateTextureContextMock,
      100, // Width
      100, // Height
      1000, // lifeSpan
      animationStateMock
    );
    expect(pause).not.toHaveBeenCalled();
  });

  test('should pause when game is playing', () => {
    // Mock animationStateMock.isPlaying to return false
    animationStateMock.isPlaying = true;

    // Mock getCurrentAnimId function
    const getCurrentAnimIdMock = jest.fn().mockReturnValue(123);

    // Mock updateAnimId function
    const updateAnimIdMock = jest.fn();

    onClickPlayPauseButton(
      fpsMock,
      universeMock,
      memoryMock,
      jest.fn(), // Mock updateTextureContext function
      100, // Width
      100, // Height
      1000, // lifeSpan
      animationStateMock as AnimationState
    );

    expect(pause).toHaveBeenCalledWith(animationStateMock);
    expect(play).not.toHaveBeenCalled();
  });
});
