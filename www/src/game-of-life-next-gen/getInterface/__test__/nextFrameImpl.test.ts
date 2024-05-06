import type { AnimationState } from '@/game-of-life-next-gen/anim-controller';
import nextFrameImpl from '../nextFrameImpl';
import type DestroyedState from '../DestroyedState';

// Mock functions
const onNextFrameMock = jest.fn();

describe('nextFrameImpl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls onNextFrame() when destroyedState.isDestroyed is false', () => {
    const animationState = {
      isPlaying: true,
      cancel: jest.fn(),
    } as unknown as AnimationState;
    const destroyedState = {
      isDestroyed: false,
    } as unknown as DestroyedState;
    nextFrameImpl(onNextFrameMock, animationState, destroyedState);
    expect(animationState.cancel).toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });

  it('does not call onNextFrame() when destroyedState.isDestroyed is true', () => {
    const animationState = {
      isPlaying: true,
      cancel: jest.fn(),
    } as unknown as AnimationState;
    const destroyedState = {
      isDestroyed: true,
    } as DestroyedState;
    nextFrameImpl(onNextFrameMock, animationState, destroyedState);
    expect(animationState.cancel).not.toHaveBeenCalled();
    expect(onNextFrameMock).not.toHaveBeenCalled();
  });

  it('calls cancel() when AnimationState.isPlaying returns true', () => {
    const animationState = {
      isPlaying: true,
      cancel: jest.fn(),
    } as unknown as AnimationState;
    const destroyedState = {
      isDestroyed: false,
    } as DestroyedState;
    nextFrameImpl(onNextFrameMock, animationState, destroyedState);
    expect(animationState.cancel).toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });

  it('does not call cancel() when AnimationState.isPlaying returns false', () => {
    const animationState = {
      isPlaying: false,
      cancel: jest.fn(),
    } as unknown as AnimationState;
    const destroyedState = {
      isDestroyed: false,
    } as unknown as DestroyedState;
    nextFrameImpl(onNextFrameMock, animationState, destroyedState);
    expect(animationState.cancel).not.toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });
});
