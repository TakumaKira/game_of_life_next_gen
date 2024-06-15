import drawCells from '../drawCells';
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { TextureColors } from '../types';

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

const mockCellsState = jest.fn();
const mockCellsAge = jest.fn();
class MockUniverse {
  cells_state = jest.fn()
  cells_age = jest.fn()
  cellsState = mockCellsState
  cellsAge = mockCellsAge
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
    const textureColors: TextureColors = {
      gridColor: '#000000ff',
      deadColor: '#111111ff',
      aliveColors: ['#ff0000ff', '#ffff00ff', '#0000ffff']
    }
    const width = 10;
    const height = 10;
    const lifespan = 100;
    const cellSize = 1;

    // Mock cellsState and cellsAge values
    const cellsState = new Uint8Array(width * height).fill(1);
    const cellsAge = new Uint8Array(width * height).fill(50);

    const mockUniverseInstance = new MockUniverse();
    mockUniverseInstance.cells_state.mockReturnValue(cellsState);
    mockUniverseInstance.cells_age.mockReturnValue(cellsAge);

    drawCells(mockUniverseInstance as unknown as Universe, memory, mockUpdateTextureContext, textureColors, width, height, lifespan, cellSize);

    // Assert that cells_state and cells_age were called with the correct arguments
    expect(mockUniverseInstance.cells_state).toHaveBeenCalled();
    expect(mockUniverseInstance.cells_age).toHaveBeenCalled();

    expect(mockCellsState).not.toHaveBeenCalled()
    expect(mockCellsAge).not.toHaveBeenCalled()

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
    
    // Call the context function with the mock context
    contextFunction(mockContext);

    // Assert that context.beginPath and context.stroke were called
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.fillStyle).toBe(textureColors.deadColor);
    expect(mockContext.stroke).toHaveBeenCalled();
  });

  test('use cellsState and cellsAge values instead of cells_state and cells_age when cells_state returns -1 as universe is UniverseJS', () => {
    const textureColors: TextureColors = {
      gridColor: '#000000ff',
      deadColor: '#111111ff',
      aliveColors: ['#ff0000ff', '#ffff00ff', '#0000ffff']
    }
    const width = 10;
    const height = 10;
    const lifespan = 100;
    const cellSize = 1;

    const mockUniverseInstance = new MockUniverse();
    mockUniverseInstance.cells_state.mockReturnValue(-1);
    mockUniverseInstance.cells_age.mockReturnValue(-1);

    drawCells(mockUniverseInstance as unknown as Universe, memory, mockUpdateTextureContext, textureColors, width, height, lifespan, cellSize);

    expect(mockCellsState).toHaveBeenCalled()
    expect(mockCellsAge).toHaveBeenCalled()
  })
});
