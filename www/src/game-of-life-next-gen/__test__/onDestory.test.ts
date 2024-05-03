import onDestroy from '../onDestroy'; // Adjust the import path as per your project structure

describe('onDestroy function', () => {
  let onClickCanvasFnRef: jest.Mock;
  let canvas: HTMLCanvasElement;
  let getCurrentAnimId: jest.Mock;
  let dispose: jest.Mock;

  beforeEach(() => {
    onClickCanvasFnRef = jest.fn();
    canvas = document.createElement('canvas');
    getCurrentAnimId = jest.fn().mockReturnValue(123);
    dispose = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove event listener, cancel animation frame, and dispose', () => {
    const result = onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose);

    expect(onClickCanvasFnRef).toHaveBeenCalled();
    expect(canvas.removeEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(123);
    expect(dispose).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  it('should not cancel animation frame if current animation ID is null', () => {
    getCurrentAnimId.mockReturnValueOnce(null);

    const result = onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose);

    expect(onClickCanvasFnRef).toHaveBeenCalled();
    expect(canvas.removeEventListener).toHaveBeenCalledWith('click', onClickCanvasFnRef);
    expect(getCurrentAnimId).toHaveBeenCalled();
    expect(window.cancelAnimationFrame).not.toHaveBeenCalled();
    expect(dispose).toHaveBeenCalled();
    expect(result).toEqual({ isDestroyed: true });
  });

  // Add more test cases for edge cases and different scenarios as needed
});
