import pause from '../pause';

const mockCancelAnimationFrame = jest.fn();
global.cancelAnimationFrame = mockCancelAnimationFrame;

describe('pause function', () => {
  test('should cancel animation and set isPlaying to false when getCurrentAnimId returns a valid ID', () => {
    // Mock getCurrentAnimId to return a valid animation ID
    const getCurrentAnimId = jest.fn().mockReturnValue(123);
    const updateAnimId = jest.fn();

    const result = pause(getCurrentAnimId, updateAnimId);

    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(updateAnimId).toHaveBeenCalledWith(null);
    expect(result.isPlaying).toBe(false);
  });

  test('should set isPlaying to false when getCurrentAnimId returns null', () => {
    // Mock getCurrentAnimId to return null
    const getCurrentAnimId = jest.fn().mockReturnValue(null);
    const updateAnimId = jest.fn();

    const result = pause(getCurrentAnimId, updateAnimId);

    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(updateAnimId).toHaveBeenCalledWith(null);
    expect(result.isPlaying).toBe(false);
  });

  test('should cancel animation with the correct ID when getCurrentAnimId returns a valid ID', () => {
    const animationId = 456;
    const getCurrentAnimId = jest.fn().mockReturnValue(animationId);
    const updateAnimId = jest.fn();

    pause(getCurrentAnimId, updateAnimId);

    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(animationId);
  });

  test('should not call cancelAnimationFrame when getCurrentAnimId returns null', () => {
    const getCurrentAnimId = jest.fn().mockReturnValue(null);
    const updateAnimId = jest.fn();

    pause(getCurrentAnimId, updateAnimId);

    expect(mockCancelAnimationFrame).not.toHaveBeenCalled();
  });

  test('should call updateAnimId with null', () => {
    const getCurrentAnimId = jest.fn().mockReturnValue(null);
    const updateAnimId = jest.fn();

    pause(getCurrentAnimId, updateAnimId);

    expect(updateAnimId).toHaveBeenCalledWith(null);
  });
});
