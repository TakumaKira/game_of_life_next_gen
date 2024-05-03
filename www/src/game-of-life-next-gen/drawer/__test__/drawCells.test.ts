import drawCells from './drawCells';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";

// Mock the updateTextureContext function
const mockUpdateTextureContext = jest.fn();

// Mock the WebAssembly.Memory object
const memory = new WebAssembly.Memory({ initial: 1 });

describe('drawCells function', () => {
  afterEach(() => {
    mockUpdateTextureContext.mockClear();
  });

  test('draws alive cells correctly', () => {
    const universe = new Universe(); // Assuming Universe constructor doesn't need arguments
    const width = 10;
    const height = 10;
    const lifeSpan = 100;

    // Mock alive cells state
    const cellsState = new Uint8Array(width * height).fill(1);
    universe.cells_state = jest.fn(() => cellsState);

    // Mock cells age
    const cellsAge = new Uint8Array(width * height).fill(50); // Arbitrary age value
    universe.cells_age = jest.fn(() => cellsAge);

    drawCells(universe, memory, mockUpdateTextureContext, width, height, lifeSpan);

    // Assert that the context was updated with the correct fillRect calls
    expect(mockUpdateTextureContext).toHaveBeenCalledTimes(1);
    expect(mockUpdateTextureContext.mock.calls[0][0].fillRect).toHaveBeenCalledTimes(width * height);
    // You might need more detailed assertions here depending on how complex your rendering logic is
  });

  test('draws dead cells correctly', () => {
    // Similar to the alive cells test, but with dead cells state
  });

  // Add more tests for edge cases if necessary
});
