import type { AnimationState } from '@/game-of-life-next-gen/anim-controller';
import nextFrameImpl from '../nextFrameImpl';
import type { DestroyedState } from '../types';

// Mock functions
const onNextFrameMock = jest.fn();
const animationState = {
  isPlaying: false,
  cancel: jest.fn(),
};

describe('nextFrameImpl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls onNextFrame() when destroyedState.isDestroyed is false', () => {
    const destroyedState: DestroyedState = { isDestroyed: false };
    animationState.isPlaying = true;
    nextFrameImpl(onNextFrameMock, animationState as unknown as AnimationState, destroyedState);
    expect(animationState.cancel).toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });

  it('does not call onNextFrame() when destroyedState.isDestroyed is true', () => {
    const destroyedState: DestroyedState = { isDestroyed: true };
    animationState.isPlaying = true;
    nextFrameImpl(onNextFrameMock, animationState as unknown as AnimationState, destroyedState);
    expect(animationState.cancel).not.toHaveBeenCalled();
    expect(onNextFrameMock).not.toHaveBeenCalled();
  });

  it('calls cancel() when AnimationState.isPlaying returns true', () => {
    animationState.isPlaying = true;
    const destroyedState: DestroyedState = { isDestroyed: false };
    nextFrameImpl(onNextFrameMock, animationState as unknown as AnimationState, destroyedState);
    expect(animationState.cancel).toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });

  it('does not call cancel() when AnimationState.isPlaying returns false', () => {
    animationState.isPlaying = false;
    const destroyedState: DestroyedState = { isDestroyed: false };
    nextFrameImpl(onNextFrameMock, animationState as unknown as AnimationState, destroyedState);
    expect(animationState.cancel).not.toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });
});
