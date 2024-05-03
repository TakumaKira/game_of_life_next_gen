import onClickCanvas from '../onClickCanvas';
import { drawGrid, drawCells } from "@/game-of-life-next-gen/drawer";
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { OnTextureHoverPosition, TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";

// Mock imports
jest.mock('@/game-of-life-next-gen/drawer', () => ({
  drawGrid: jest.fn(),
  drawCells: jest.fn()
}));

jest.mock('@/game-of-life-next-gen/gl-renderer', () => ({
  OnTextureHoverPosition: jest.fn()
}));

jest.mock('../getRowColFromTextureHoverPosition', () => jest.fn(() => ({ row: 1, col: 1 })));

describe('onClickCanvas', () => {
  let universeMock: Universe, memoryMock: WebAssembly.Memory, updateTextureContextMock: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, onTextureHoverPosition: OnTextureHoverPosition;

  beforeEach(() => {
    universeMock = {
      toggle_cell: jest.fn()
    } as unknown as Universe;
    memoryMock = {} as WebAssembly.Memory;
    updateTextureContextMock = jest.fn();
    width = 10;
    height = 10;
    lifeSpan = 100;
    onTextureHoverPosition = { x: 5, z: 5 };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call toggle_cell and draw functions with correct parameters', () => {
    onClickCanvas(universeMock, memoryMock, updateTextureContextMock, width, height, lifeSpan, onTextureHoverPosition);

    expect(universeMock.toggle_cell).toHaveBeenCalledWith(1, 1);
    expect(drawCells).toHaveBeenCalledWith(universeMock, memoryMock, updateTextureContextMock, width, height, lifeSpan);
    expect(drawGrid).toHaveBeenCalledWith(updateTextureContextMock, width, height);
  });

  test('should return early if onTextureHoverPosition is falsy', () => {
    onClickCanvas(universeMock, memoryMock, updateTextureContextMock, width, height, lifeSpan, null);

    expect(universeMock.toggle_cell).not.toHaveBeenCalled();
    expect(drawCells).not.toHaveBeenCalled();
    expect(drawGrid).not.toHaveBeenCalled();
  });
});
