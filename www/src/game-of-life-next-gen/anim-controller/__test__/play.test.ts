import play from "../play";
import renderLoop from "../renderLoop";
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import type AnimationState from "../AnimationState";

// Mocks
jest.mock("../renderLoop", () => jest.fn());

describe("play function", () => {
  let fps: FPS, universe: Universe, updateUniverse: () => void, speed: number;

  beforeEach(() => {
    // Initialize mock variables
    fps = jest.fn() as unknown as FPS;
    universe = {} as Universe;
    updateUniverse = jest.fn();
    speed = 1;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call renderLoop with correct parameters", () => {
    const mockAnimationState = {} as AnimationState
    play(fps, universe, updateUniverse, mockAnimationState, speed);
    expect(renderLoop).toHaveBeenCalledWith(fps, universe, updateUniverse, mockAnimationState, speed);
  });
});
