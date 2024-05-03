import isPaused from "../isPaused";

// Mock getCurrentAnimId function
const mockGetCurrentAnimId = jest.fn();

describe('isPaused function', () => {
  afterEach(() => {
    mockGetCurrentAnimId.mockClear();
  });

  test('returns true when getCurrentAnimId returns null', () => {
    mockGetCurrentAnimId.mockReturnValueOnce(null);
    expect(isPaused(mockGetCurrentAnimId)).toBe(true);
    expect(mockGetCurrentAnimId).toHaveBeenCalledTimes(1);
  });

  test('returns false when getCurrentAnimId returns a number', () => {
    mockGetCurrentAnimId.mockReturnValueOnce(123);
    expect(isPaused(mockGetCurrentAnimId)).toBe(false);
    expect(mockGetCurrentAnimId).toHaveBeenCalledTimes(1);
  });
  
  test('returns true when getCurrentAnimId returns 0', () => {
    mockGetCurrentAnimId.mockReturnValueOnce(0);
    expect(isPaused(mockGetCurrentAnimId)).toBe(false);
    expect(mockGetCurrentAnimId).toHaveBeenCalledTimes(1);
  });

  test('returns true when getCurrentAnimId returns a non-zero number', () => {
    mockGetCurrentAnimId.mockReturnValueOnce(456);
    expect(isPaused(mockGetCurrentAnimId)).toBe(false);
    expect(mockGetCurrentAnimId).toHaveBeenCalledTimes(1);
  });
});
