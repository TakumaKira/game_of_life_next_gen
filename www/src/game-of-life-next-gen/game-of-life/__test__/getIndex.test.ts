import getIndex from '../getIndex';

describe('getIndex function', () => {
  test('returns correct index for valid row and column', () => {
    expect(getIndex(2, 3, 5)).toBe(13);
  });

  test('returns 0 for row and column equal to 0', () => {
    expect(getIndex(0, 0, 5)).toBe(0);
  });

  test('returns correct index when width is 1', () => {
    expect(getIndex(2, 3, 1)).toBe(5);
  });

  test('returns correct index when row or column is negative', () => {
    expect(getIndex(-2, 3, 5)).toBe(-7);
    expect(getIndex(2, -3, 5)).toBe(-1);
  });
});
