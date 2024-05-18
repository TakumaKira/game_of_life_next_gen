import { TEXTURE_SIZE } from '@/game-of-life-next-gen/constants';
import getRowColFromTextureHoverPosition from '../getRowColFromTextureHoverPosition';

describe('getRowColFromTextureHoverPosition', () => {
  it('should return correct row and column for the center of texture', () => {
    const fieldSize = 8
    const centerOfTexture = { x: 0, z: 0 };
    const result = getRowColFromTextureHoverPosition(centerOfTexture, fieldSize);
    expect(result.row).toEqual(Math.floor(0.5 * fieldSize));
    expect(result.col).toEqual(Math.floor(0.5 * fieldSize));
  });

  it('should return correct row and column for the first cell position', () => {
    const fieldSize = 8
    const halfSizeOfCell = TEXTURE_SIZE / fieldSize / 2;
    const firstCellPosition = { x: -(TEXTURE_SIZE / 2 - halfSizeOfCell), z: TEXTURE_SIZE / 2 - halfSizeOfCell };
    const result = getRowColFromTextureHoverPosition(firstCellPosition, fieldSize);
    expect(result.row).toEqual(0);
    expect(result.col).toEqual(0);
  });

  it('should return correct row and column for the last cell position', () => {
    const fieldSize = 8
    const halfSizeOfCell = TEXTURE_SIZE / fieldSize / 2;
    const lastCellPosition = { x: TEXTURE_SIZE / 2 - halfSizeOfCell, z: -(TEXTURE_SIZE / 2 - halfSizeOfCell) };
    const result = getRowColFromTextureHoverPosition(lastCellPosition, fieldSize);
    expect(result.row).toEqual(Math.floor(fieldSize - 1));
    expect(result.col).toEqual(Math.floor(fieldSize - 1));
  });

  // Add more test cases for edge cases and other scenarios as needed
});
