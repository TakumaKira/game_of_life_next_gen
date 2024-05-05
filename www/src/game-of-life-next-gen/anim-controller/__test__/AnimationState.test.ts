import AnimationState from '../AnimationState';

jest.useFakeTimers();

describe('AnimationState', () => {
  let animationState: AnimationState;
  let requestAnimationFrameSpy: jest.SpyInstance<number, [FrameRequestCallback]>;
  let cancelAnimationFrameSpy: jest.SpyInstance<void, [number]>;

  beforeEach(() => {
    animationState = new AnimationState();
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
  });

  afterEach(() => {
    animationState.cancel(); // Cleanup after each test
    requestAnimationFrameSpy.mockRestore();
    cancelAnimationFrameSpy.mockRestore();
  });

  it('should request next frame', () => {
    const nextJob = jest.fn();
    animationState.requestNextFrame(nextJob);
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(animationState.isPlaying).toBe(true);
    jest.advanceTimersToNextTimer();
    expect(nextJob).toHaveBeenCalled();
  });

  it('should cancel animation', () => {
    animationState.requestNextFrame(() => {}); // Run an animation frame
    expect(animationState.isPlaying).toBe(true);
    animationState.cancel();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    expect(animationState.isPlaying).toBe(false);
  });

  it('should register and unregister update playing state callbacks', () => {
    const callback = jest.fn();
    animationState.registerOnUpdatePlayingState(callback);
    expect(animationState.isPlaying).toBe(false);
    jest.advanceTimersToNextTimer();
    expect(callback.mock.calls).toEqual([]);

    animationState.requestNextFrame(() => {}); // Run an animation frame
    expect(animationState.isPlaying).toBe(true);
    jest.advanceTimersToNextTimer();
    expect(callback.mock.calls).toEqual([[true]]);

    animationState.cancel();
    expect(animationState.isPlaying).toBe(false);
    jest.advanceTimersToNextTimer();
    expect(callback.mock.calls).toEqual([[true], [false]]);

    animationState.clear();
    expect(animationState.isPlaying).toBe(false);
    jest.advanceTimersToNextTimer();
    expect(callback.mock.calls).toEqual([[true], [false]]);
  });
});
