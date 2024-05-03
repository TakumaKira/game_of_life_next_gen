import play from "../play";
import renderLoop from "../renderLoop";

// Mocks
jest.mock("../renderLoop", () => jest.fn());

describe("play function", () => {
  let fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId;

  beforeEach(() => {
    // Initialize mock variables
    fps = jest.fn();
    universe = {};
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
