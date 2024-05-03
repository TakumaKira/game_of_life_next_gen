import renderLoop from './renderLoop'; // Import the function to test
import { drawGrid, drawCells } from "@/game-of-life-next-gen/drawer"; // Import functions used in renderLoop
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"; // Import Universe type
// Import other necessary dependencies and types

// Mock dependencies
jest.mock('@/game-of-life-next-gen/drawer', () => ({
  drawGrid: jest.fn(),
  drawCells: jest.fn()
}));

describe('renderLoop', () => {
  let fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId;

  beforeEach(() => {
    // Initialize variables or mocks before each test
    fps = { render: jest.fn() };
    universe = new Universe();
    memory = new WebAssembly.Memory({ initial: 10 });
    updateTextureContext = jest.fn();
    width = 10;
    height = 10;
    lifeSpan = 100;
    updateAnimId = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should render FPS, grid, and cells properly', () => {
    // Mock requestAnimationFrame to immediately execute callback
    global.requestAnimationFrame = jest.fn(callback => callback());
    
    renderLoop(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);

    // FPS should be rendered
    expect(fps.render).toHaveBeenCalled();

    // Grid and cells should be drawn
    expect(drawGrid).toHaveBeenCalledWith(updateTextureContext, width, height);
    expect(drawCells).toHaveBeenCalledWith(universe, memory, updateTextureContext, width, height, lifeSpan);

    // Universe should be ticked 9 times
    expect(universe.tick).toHaveBeenCalledTimes(9);

    // updateAnimId should be called with requestAnimationFrame ID
    expect(updateAnimId).toHaveBeenCalledWith(expect.any(Number));
  });

  // Add more test cases as needed
});
