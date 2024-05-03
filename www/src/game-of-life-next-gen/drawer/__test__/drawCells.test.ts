import drawCells from '../drawCells';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";

// Mock the updateTextureContext function
const mockUpdateTextureContext = jest.fn();

// Mock the canvas context methods
const mockContext = {
  beginPath: jest.fn(),
  fillRect: jest.fn(),
  stroke: jest.fn()
};

// Mock the WebAssembly.Memory object
const memory = new WebAssembly.Memory({ initial: 1 });

jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => ({
  Universe: jest.fn(() => ({
    cells_state: jest.fn(),
    cells_age: jest.fn()
  }))
}));

describe('drawCells function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('draws alive cells correctly', () => {
    const width = 10;
    const height = 10;
    const lifeSpan = 100;

    // Mock cellsState and cellsAge values
    const cellsState = new Uint8Array(width * height).fill(1);
    const cellsAge = new Uint8Array(width * height).fill(50);

    const mockUniverse: any = Universe as jest.MockedClass<typeof Universe>;
    mockUniverse.mock.instances[0].cells_state.mockReturnValue(cellsState);
    mockUniverse.mock.instances[0].cells_age.mockReturnValue(cellsAge);

    drawCells(new Universe(), memory, mockUpdateTextureContext, width, height, lifeSpan);

    // Assert that cells_state and cells_age were called with the correct arguments
    expect(mockUniverse.mock.instances[0].cells_state).toHaveBeenCalledWith();
    expect(mockUniverse.mock.instances[0].cells_age).toHaveBeenCalledWith();

    // Assert that updateTextureContext was called
    expect(mockUpdateTextureContext).toHaveBeenCalledTimes(1);

    // Assert that context.beginPath and context.stroke were called
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.stroke).toHaveBeenCalled();
  });
});
