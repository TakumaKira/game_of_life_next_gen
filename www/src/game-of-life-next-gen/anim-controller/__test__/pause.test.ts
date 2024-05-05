import type AnimationState from '../AnimationState';
import pause from '../pause';

describe('pause function', () => {
  test('should call AnimationState.cancel', () => {
    const mockAnimationState = {
      cancel: jest.fn(),
    } as unknown as AnimationState;

    pause(mockAnimationState);

    expect(mockAnimationState.cancel).toHaveBeenCalled();
  });
});
