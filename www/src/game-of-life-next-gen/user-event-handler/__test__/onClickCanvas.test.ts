import onClickCanvas from '../onClickCanvas';
import getRowColFromTextureHoverPosition from '../getRowColFromTextureHoverPosition';
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { OnTextureHoverPosition } from "@/game-of-life-next-gen/gl-renderer";

jest.mock('@/game-of-life-next-gen/gl-renderer', () => ({
  OnTextureHoverPosition: jest.fn()
}));

jest.mock('../getRowColFromTextureHoverPosition', () => jest.fn(() => ({ row: 1, col: 1 })));

describe('onClickCanvas', () => {
  let universeMock: Universe, memoryMock: WebAssembly.Memory, updateUniverseMock: () => void, fieldSize: number, onTextureHoverPosition: OnTextureHoverPosition;

  beforeEach(() => {
    universeMock = {
      toggle_cell: jest.fn()
    } as unknown as Universe;
    memoryMock = {} as WebAssembly.Memory;
    updateUniverseMock = jest.fn();
    fieldSize = 10;
    onTextureHoverPosition = { x: 5, z: 5 };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call toggle_cell and draw functions with correct parameters', () => {
    onClickCanvas(universeMock, updateUniverseMock, onTextureHoverPosition, fieldSize);

    expect(getRowColFromTextureHoverPosition).toHaveBeenCalledWith(onTextureHoverPosition, fieldSize);
    expect(universeMock.toggle_cell).toHaveBeenCalledWith(1, 1);
    expect(updateUniverseMock).toHaveBeenCalled();
  });

  test('should return early if onTextureHoverPosition is falsy', () => {
    onClickCanvas(universeMock, updateUniverseMock, null, fieldSize);

    expect(getRowColFromTextureHoverPosition).not.toHaveBeenCalled();
    expect(universeMock.toggle_cell).not.toHaveBeenCalled();
    expect(updateUniverseMock).not.toHaveBeenCalled();
  });
});
