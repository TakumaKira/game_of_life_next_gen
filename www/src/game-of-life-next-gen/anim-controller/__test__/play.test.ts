import play from "../play";
import renderLoop from "../renderLoop";
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";

// Mocks
jest.mock("../renderLoop", () => jest.fn());

describe("play function", () => {
  let fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, updateAnimId: (id: number | null) => void;

  beforeEach(() => {
    // Initialize mock variables
    fps = jest.fn() as unknown as FPS;
    universe = {} as Universe;
    memory = new WebAssembly.Memory({ initial: 1 });
    updateTextureContext = jest.fn();
    width = 100;
    height = 100;
    lifeSpan = 1000;
    updateAnimId = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call renderLoop with correct parameters", () => {
    play(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
    expect(renderLoop).toHaveBeenCalledWith(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
  });

  it("should return an object with isPlaying set to true", () => {
    const result = play(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
    expect(result).toEqual({ isPlaying: true });
  });
});
