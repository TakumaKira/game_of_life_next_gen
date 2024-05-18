import { sanitizeAliveCellBaseOptionsEnv } from "@/const";

describe('sanitizeAliveCellBaseOptionsEnv', () => {
  beforeAll(() => {
    // Clear any previous console output captures
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore the original console.warn function
    jest.restoreAllMocks();
  });

  test('should return null if input is undefined', () => {
    const result = sanitizeAliveCellBaseOptionsEnv(undefined);
    expect(result).toBeNull();
  });

  test('should return null and log a warning for non-numeric string input', () => {
    const input = 'abc';
    const result = sanitizeAliveCellBaseOptionsEnv(input);
    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(`Configured ALIVE_CELL_BASE_OPTIONS is not a number: ${process.env.ALIVE_CELL_BASE_OPTIONS}`);
  });

  test('should return null and log a warning for negative number string input', () => {
    const input = '-123';
    const result = sanitizeAliveCellBaseOptionsEnv(input);
    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(`Configured ALIVE_CELL_BASE_OPTIONS is a negative number: ${process.env.ALIVE_CELL_BASE_OPTIONS}`);
  });

  test('should return integer part for non-integer number string input', () => {
    const input = '123.456';
    const result = sanitizeAliveCellBaseOptionsEnv(input);
    expect(result).toBe(123);
  });

  test('should return the integer for positive integer string input', () => {
    const input = '123';
    const result = sanitizeAliveCellBaseOptionsEnv(input);
    expect(result).toBe(123);
  });

  test('should return 0 for zero string input', () => {
    const input = '0';
    const result = sanitizeAliveCellBaseOptionsEnv(input);
    expect(result).toBe(0);
  });
});
