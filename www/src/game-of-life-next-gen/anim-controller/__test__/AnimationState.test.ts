import AnimationState from './AnimationState';

describe('AnimationState', () => {
  let animationState: AnimationState;

  beforeEach(() => {
    animationState = new AnimationState();
  });

  afterEach(() => {
    animationState.cancel(); // Cleanup after each test
  });

  it('should request next frame', () => {
    const nextJob = jest.fn();
    animationState.requestNextFrame(nextJob);
    expect(animationState.isPlaying).toBe(true);
    expect(nextJob).toHaveBeenCalled();
  });

  it('should cancel animation', () => {
    animationState.requestNextFrame(() => {}); // Start animation
    animationState.cancel();
    expect(animationState.isPlaying).toBe(false);
  });

  it('should register and unregister update playing state callbacks', () => {
    const callback = jest.fn();
    animationState.registerOnUpdatePlayingState(callback);
    expect(animationState['_currentId']).toBe(null); // No animation running initially
    expect(animationState.isPlaying).toBe(false);
    expect(callback).toHaveBeenCalledWith(false);

    animationState.requestNextFrame(() => {}); // Start animation
    expect(animationState.isPlaying).toBe(true);
    expect(callback).toHaveBeenCalledWith(true);

    animationState.unregisterAllOfOnUpdatePlayingState();
    expect(animationState['_currentId']).toBe(null); // Animation stopped
    expect(animationState.isPlaying).toBe(false);
    expect(callback).toHaveBeenCalledWith(false);
  });
});
