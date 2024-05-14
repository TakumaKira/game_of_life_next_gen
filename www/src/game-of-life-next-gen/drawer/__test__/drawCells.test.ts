import { Color4 } from 'babylonjs';
import drawCells from '../drawCells';
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

// Need to mock as actual import is currently not working in Jest environment ( SyntaxError: Unexpected token 'export' )
jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => {
  enum CellState {
    Dead = 0,
    Alive = 1,
  }
  return {
    CellState: CellState,
  }
});

class MockUniverse {
  cells_state = jest.fn()
  cells_age = jest.fn()
}

// Mock the WebAssembly.Memory object
const memory = new WebAssembly.Memory({ initial: 1 });

// Mock the updateTextureContext function
const mockUpdateTextureContext = jest.fn();

describe('drawCells function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('draws alive cells correctly', () => {
    const width = 10;
    const height = 10;
    const lifeSpan = 100;
    const cellSize = 1;

    // Mock cellsState and cellsAge values
    const cellsState = new Uint8Array(width * height).fill(1);
    const cellsAge = new Uint8Array(width * height).fill(50);

    const mockUniverseInstance = new MockUniverse();
    mockUniverseInstance.cells_state.mockReturnValue(cellsState);
    mockUniverseInstance.cells_age.mockReturnValue(cellsAge);

    drawCells(mockUniverseInstance as unknown as Universe, memory, mockUpdateTextureContext, width, height, lifeSpan, cellSize);

    // Assert that cells_state and cells_age were called with the correct arguments
    expect(mockUniverseInstance.cells_state).toHaveBeenCalled();
    expect(mockUniverseInstance.cells_age).toHaveBeenCalled();

    // Assert that updateTextureContext was called
    expect(mockUpdateTextureContext).toHaveBeenCalledTimes(1);

    // Get the passed context function
    const contextFunction = mockUpdateTextureContext.mock.calls[0][0];

    // Mock the canvas context methods
    const mockContext = {
      beginPath: jest.fn(),
      fillStyle: jest.fn(),
      fillRect: jest.fn(),
      stroke: jest.fn()
    };

    const mockTextureValues = {
      aliveColors: [new Color4(0.1,0.1,0.1,0.1), new Color4(0.2,0.2,0.2,0.2), new Color4(0.3,0.3,0.3,0.3)],
      deadColor: new Color4(0,0,0,0)
    };
    
    // Call the context function with the mock context
    contextFunction(mockContext, mockTextureValues);

    // Assert that context.beginPath and context.stroke were called
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.fillStyle).toBe(mockTextureValues.deadColor.toHexString());
    expect(mockContext.stroke).toHaveBeenCalled();
  });
});
