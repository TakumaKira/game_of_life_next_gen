import getIsAgeInRange from '../getIsAgeInRange';

describe('getIsAgeInRange', () => {
  // Test case when age is within the specified range
  it('returns true when age is within the specified range', () => {
    expect(getIsAgeInRange(30, 80, 1, 4)).toBe(true);
  });

  // Test case when age is at the lower bound of the specified range
  it('returns true when age is at the lower bound of the specified range', () => {
    expect(getIsAgeInRange(20, 80, 1, 4)).toBe(true);
  });

  // Test case when age is at the upper bound of the specified range
  it('returns true when age is at the upper bound of the specified range', () => {
    expect(getIsAgeInRange(39, 80, 1, 4)).toBe(true);
  });

  // Test case when age is outside the specified range
  it('returns false when age is outside the specified range', () => {
    expect(getIsAgeInRange(10, 80, 1, 4)).toBe(false);
  });

  // Test case when age is greater than life span
  it('returns false when age is greater than life span', () => {
    expect(getIsAgeInRange(90, 80, 1, 4)).toBe(false);
  });

  // Test case when range length is 1
  it('returns true when range length is 1 and age is within the specified range', () => {
    expect(getIsAgeInRange(20, 80, 0, 1)).toBe(true);
  });

  // Test case when range length is 1 and age is outside the specified range
  it('returns false when range length is 1 and age is outside the specified range', () => {
    expect(getIsAgeInRange(30, 80, 1, 1)).toBe(false);
  });
});
