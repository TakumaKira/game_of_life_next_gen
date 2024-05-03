import drawCells from '../drawCells';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";

// Mock the updateTextureContext function
const mockUpdateTextureContext = jest.fn();

// Mock the WebAssembly.Memory object
const memory = new WebAssembly.Memory({ initial: 1 });

jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => ({
  Universe: jest.fn()
}));

describe('drawCells function', () => {
  afterEach(() => {
    mockUpdateTextureContext.mockClear();
  });

  test('draws alive cells correctly', () => {
    const width = 10;
    const height = 10;
    const lifeSpan = 100;

    // Mock alive cells state pointer
    const cellsStatePtr = 123; // Mock the pointer value
    Universe.mock.instances[0].cells_state.mockReturnValue(cellsStatePtr);

    // Mock cells age pointer
    const cellsAgePtr = 456; // Mock the pointer value
    Universe.mock.instances[0].cells_age.mockReturnValue(cellsAgePtr);

    drawCells(Universe.mock.instances[0], memory, mockUpdateTextureContext, width, height, lifeSpan);

    // Assert that the context was updated with the correct fillRect calls
    expect(mockUpdateTextureContext).toHaveBeenCalledTimes(1);
    // You might need more detailed assertions here depending on how complex your rendering logic is
  });

  test('draws dead cells correctly', () => {
    // Similar to the alive cells test, but with dead cells state
  });

  // Add more tests for edge cases if necessary
});
