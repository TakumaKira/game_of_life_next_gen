import { FIELD_SIZE, TEXTURE_SIZE } from '@/game-of-life-next-gen/constants';
import getRowColFromTextureHoverPosition from '../getRowColFromTextureHoverPosition';

describe('getRowColFromTextureHoverPosition', () => {
  it('should return correct row and column for the center of texture', () => {
    const centerOfTexture = { x: 0, z: 0 };
    const result = getRowColFromTextureHoverPosition(centerOfTexture);
    expect(result.row).toEqual(Math.floor(0.5 * FIELD_SIZE));
    expect(result.col).toEqual(Math.floor(0.5 * FIELD_SIZE));
  });

  it('should return correct row and column for the first cell position', () => {
    const halfSizeOfCell = TEXTURE_SIZE / FIELD_SIZE / 2;
    const firstCellPosition = { x: -(TEXTURE_SIZE / 2 - halfSizeOfCell), z: TEXTURE_SIZE / 2 - halfSizeOfCell };
    const result = getRowColFromTextureHoverPosition(firstCellPosition);
    expect(result.row).toEqual(0);
    expect(result.col).toEqual(0);
  });

  it('should return correct row and column for the last cell position', () => {
    const halfSizeOfCell = TEXTURE_SIZE / FIELD_SIZE / 2;
    const lastCellPosition = { x: TEXTURE_SIZE / 2 - halfSizeOfCell, z: -(TEXTURE_SIZE / 2 - halfSizeOfCell) };
    const result = getRowColFromTextureHoverPosition(lastCellPosition);
    expect(result.row).toEqual(Math.floor(FIELD_SIZE - 1));
    expect(result.col).toEqual(Math.floor(FIELD_SIZE - 1));
  });

  // Add more test cases for edge cases and other scenarios as needed
});
