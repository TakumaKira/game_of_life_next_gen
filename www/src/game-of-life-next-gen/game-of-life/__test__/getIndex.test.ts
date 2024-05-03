import getIndex from '../getIndex';

describe('getIndex function', () => {
  test('returns correct index for valid row and column', () => {
    expect(getIndex(2, 3, 5)).toBe(13);
  });

  test('returns 0 for row and column equal to 0', () => {
    expect(getIndex(0, 0, 5)).toBe(0);
  });

  test('returns correct index when width is 1', () => {
    expect(getIndex(2, 0, 1)).toBe(2);
  });

  test('throws error for negative row', () => {
    expect(() => getIndex(-2, 3, 5)).toThrowError('row -2 is out of bounds');
  });

  test('throws error for negative column', () => {
    expect(() => getIndex(2, -3, 5)).toThrowError('column -3 is out of bounds');
  });

  test('throws error for column exceeding width', () => {
    expect(() => getIndex(2, 6, 5)).toThrowError('column 6 is out of bounds');
  });

  test('throws error for non-positive width', () => {
    expect(() => getIndex(2, 3, 0)).toThrowError('width 0 is out of bounds');
    expect(() => getIndex(2, 3, -5)).toThrowError('width -5 is out of bounds');
  });
});
