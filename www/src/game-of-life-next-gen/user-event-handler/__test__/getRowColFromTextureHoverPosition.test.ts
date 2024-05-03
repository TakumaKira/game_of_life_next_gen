import getRowColFromTextureHoverPosition from './getRowColFromTextureHoverPosition';

// Mock the OnTextureHoverPosition type
type OnTextureHoverPositionMock = {
  x: number;
  z: number;
};

describe('getRowColFromTextureHoverPosition', () => {
  it('should return correct row and column when onTextureHoverPosition is at the center of the field', () => {
    const onTextureHoverPosition: OnTextureHoverPositionMock = { x: 0, z: 0 };
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toBeCloseTo(25); // Adjust this value according to your implementation
    expect(result.col).toBeCloseTo(25); // Adjust this value according to your implementation
  });

  it('should return correct row and column when onTextureHoverPosition is at the top-left corner of the field', () => {
    const onTextureHoverPosition: OnTextureHoverPositionMock = { x: -10, z: 10 };
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toBe(0);
    expect(result.col).toBe(0);
  });

  it('should return correct row and column when onTextureHoverPosition is at the bottom-right corner of the field', () => {
    const onTextureHoverPosition: OnTextureHoverPositionMock = { x: 10, z: -10 };
    const result = getRowColFromTextureHoverPosition(onTextureHoverPosition);
    expect(result.row).toBe(49); // Assuming FIELD_SIZE is 50
    expect(result.col).toBe(49); // Assuming FIELD_SIZE is 50
  });

  // Add more test cases as needed for edge cases and boundary conditions
});
