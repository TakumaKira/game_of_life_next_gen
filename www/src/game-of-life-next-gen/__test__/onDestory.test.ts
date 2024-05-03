import onDestroy from '../onDestroy'; // Adjust the import path as per your project structure

describe('onDestroy function', () => {
  let onClickCanvasFnRef: jest.Mock;
  let canvas: HTMLCanvasElement;
  let mockRemoveEventListener: jest.SpyInstance;
  let mockCancelAnimationFrame: jest.SpyInstance;
  let getCurrentAnimId: jest.Mock;
  let dispose: jest.Mock;

  beforeEach(() => {
    onClickCanvasFnRef = jest.fn();
    canvas = document.createElement('canvas');
    mockRemoveEventListener = jest.spyOn(canvas, 'removeEventListener');
    mockCancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
    getCurrentAnimId = jest.fn().mockReturnValue(123);
    dispose = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove event listener, cancel animation frame, and dispose', () => {
    const result = onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose);

    expect(onClickCanvasFnRef).not.toHaveBeenCalled();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(123);
    expect(dispose).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  it('should not cancel animation frame if current animation ID is null', () => {
    getCurrentAnimId.mockReturnValueOnce(null);

    const result = onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose);

    expect(onClickCanvasFnRef).not.toHaveBeenCalled();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(mockCancelAnimationFrame).not.toHaveBeenCalled();
    expect(dispose).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  // Add more test cases for edge cases and different scenarios as needed
});
