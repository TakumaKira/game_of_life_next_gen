import { FIELD_SIZE, TEXTURE_SIZE } from '@/game-of-life-next-gen/constants';
import getRowColFromTextureHoverPosition from '../getRowColFromTextureHoverPosition';

describe('getRowColFromTextureHoverPosition', () => {
  it('should return correct row and column for a given onTextureHoverPosition', () => {
    const onTextureHoverPosition = { x: 0, z: 0 }; // Center position
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toEqual(Math.floor(0.5 * FIELD_SIZE));
    expect(result.col).toEqual(Math.floor(0.5 * FIELD_SIZE));
  });

  it('should return correct row and column for a given onTextureHoverPosition at (x=TEXTURE_SIZE/2, z=TEXTURE_SIZE/2)', () => {
    const onTextureHoverPosition = { x: TEXTURE_SIZE / 2, z: TEXTURE_SIZE / 2 }; // Center position
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toEqual(Math.floor((TEXTURE_SIZE / 2 / TEXTURE_SIZE) * FIELD_SIZE));
    expect(result.col).toEqual(Math.floor((TEXTURE_SIZE / 2 / TEXTURE_SIZE) * FIELD_SIZE));
  });

  it('should return correct row and column for a given onTextureHoverPosition at (x=-TEXTURE_SIZE/2, z=-TEXTURE_SIZE/2)', () => {
    const onTextureHoverPosition = { x: -TEXTURE_SIZE / 2, z: -TEXTURE_SIZE / 2 }; // Center position
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toEqual(Math.floor(((TEXTURE_SIZE - (TEXTURE_SIZE / 2)) / TEXTURE_SIZE) * FIELD_SIZE));
    expect(result.col).toEqual(Math.floor(((TEXTURE_SIZE - (TEXTURE_SIZE / 2)) / TEXTURE_SIZE) * FIELD_SIZE));
  });

  // Add more test cases for edge cases and other scenarios as needed
});
