import type { AnimationState } from '../anim-controller';
import onDestroy from '../onDestroy'; // Adjust the import path as per your project structure

describe('onDestroy function', () => {
  let onClickCanvasFnRef: jest.Mock;
  let canvas: HTMLCanvasElement;
  let mockRemoveEventListener: jest.SpyInstance;
  let animationState: { isPlaying: boolean; cancel: jest.Mock };
  let destroySetup: jest.Mock;

  beforeEach(() => {
    onClickCanvasFnRef = jest.fn();
    canvas = document.createElement('canvas');
    mockRemoveEventListener = jest.spyOn(canvas, 'removeEventListener');
    animationState = { isPlaying: false, cancel: jest.fn() };
    destroySetup = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove event listener, cancel animation if animation is playing, and destroy', () => {
    animationState.isPlaying = true;

    const result = onDestroy(onClickCanvasFnRef, canvas, animationState as unknown as AnimationState, destroySetup);

    expect(onClickCanvasFnRef).not.toHaveBeenCalled();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(animationState.cancel).toHaveBeenCalled();
    expect(destroySetup).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  it('should not cancel animation frame if current animation is playing', () => {
    animationState.isPlaying = false;

    const result = onDestroy(onClickCanvasFnRef, canvas, animationState as unknown as AnimationState, destroySetup);

    expect(onClickCanvasFnRef).not.toHaveBeenCalled();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(animationState.cancel).not.toHaveBeenCalled();
    expect(destroySetup).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  // Add more test cases for edge cases and different scenarios as needed
});
