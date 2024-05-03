import onClickCanvas from './onClickCanvas'; // Adjust the import path as per your project structure
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { drawCells, drawGrid } from "@/game-of-life-next-gen/drawer";

// Mock dependencies
jest.mock("@/game-of-life-next-gen/drawer", () => ({
  drawCells: jest.fn(),
  drawGrid: jest.fn(),
}));

describe('onClickCanvas', () => {
  // Mock universe object and other parameters
  const mockUniverse = {
    toggle_cell: jest.fn(),
  };
  const mockMemory = new WebAssembly.Memory({ initial: 256 });
  const mockUpdateTextureContext = jest.fn();
  const width = 100;
  const height = 100;
  const lifeSpan = 10;
  const onTextureHoverPosition = { x: 0, y: 0, z: 0 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle cell in universe and redraw cells and grid', () => {
    onClickCanvas(mockUniverse, mockMemory, mockUpdateTextureContext, width, height, lifeSpan, onTextureHoverPosition);

    // Expect toggle_cell to be called with correct row and col
    expect(mockUniverse.toggle_cell).toHaveBeenCalledTimes(1);
    expect(mockUniverse.toggle_cell).toHaveBeenCalledWith(25, 50); // Update with your expected row and col values

    // Expect drawCells and drawGrid to be called with correct arguments
    expect(drawCells).toHaveBeenCalledTimes(1);
    expect(drawCells).toHaveBeenCalledWith(mockUniverse, mockMemory, mockUpdateTextureContext, width, height, lifeSpan);

    expect(drawGrid).toHaveBeenCalledTimes(1);
    expect(drawGrid).toHaveBeenCalledWith(mockUpdateTextureContext, width, height);
  });

  it('should not toggle cell if onTextureHoverPosition is not provided', () => {
    onClickCanvas(mockUniverse, mockMemory, mockUpdateTextureContext, width, height, lifeSpan, null);

    // Expect toggle_cell not to be called
    expect(mockUniverse.toggle_cell).not.toHaveBeenCalled();

    // Expect drawCells and drawGrid to be called with correct arguments
    expect(drawCells).toHaveBeenCalledTimes(1);
    expect(drawCells).toHaveBeenCalledWith(mockUniverse, mockMemory, mockUpdateTextureContext, width, height, lifeSpan);

    expect(drawGrid).toHaveBeenCalledTimes(1);
    expect(drawGrid).toHaveBeenCalledWith(mockUpdateTextureContext, width, height);
  });
});
