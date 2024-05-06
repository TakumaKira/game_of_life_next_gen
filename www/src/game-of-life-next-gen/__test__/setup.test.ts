// Import the function to test
import { AnimationState } from '../anim-controller';
import { FPS, getUniverse } from '../game-of-life';
import { setupGLRenderer } from '../gl-renderer';
import setup from '../setup';
import { onClickCanvas, onClickNextFrameButton, onClickPlayPauseButton } from '../user-event-handler';

const mockDisposeGLRenderer = jest.fn();

// Mock dependencies as needed
jest.mock('@/game-of-life-next-gen/game-of-life', () => ({
  getUniverse: jest.fn(() => ({ universe: {}, width: 0, height: 0, lifeSpan: 0 })),
  FPS: jest.fn(() => ({ updateFpsData: jest.fn() })),
}));
jest.mock('@/game-of-life-next-gen/user-event-handler', () => ({
  onClickCanvas: jest.fn(),
  onClickNextFrameButton: jest.fn(),
  onClickPlayPauseButton: jest.fn().mockReturnValue({ isPlaying: false }),
}));
jest.mock('@/game-of-life-next-gen/gl-renderer', () => ({
  setupGLRenderer: jest.fn(() => ({ updateTextureContext: jest.fn(), dispose: mockDisposeGLRenderer })),
}));
const mockAnimationStateConstructor = jest.fn();
const mockRegisterOnUpdatePlayingState = jest.fn();
const mockClear = jest.fn();
jest.mock('../anim-controller', () => ({
  __esModule: true,
  AnimationState: class {
    constructor() {
      mockAnimationStateConstructor();
    }
    registerOnUpdatePlayingState = mockRegisterOnUpdatePlayingState;
    clear = mockClear;
  }
}))

describe('setup function', () => {
  let canvas: HTMLCanvasElement | null;
  let mockCanvasAddEventListener: jest.SpyInstance | null;
  let updatePlayingState: jest.Mock | null;
  let updateFpsData: jest.Mock | null;
  let memory: WebAssembly.Memory | null;
  let animationState: AnimationState | null;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    mockCanvasAddEventListener = jest.spyOn(canvas, 'addEventListener');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
    memory = new WebAssembly.Memory({ initial: 1 });
    animationState = new AnimationState();
  });

  afterEach(() => {
    // Clean up after each test
    canvas = null;
    mockCanvasAddEventListener = null;
    updatePlayingState = null;
    updateFpsData = null;
    memory = null;
    animationState = null;
  });

  test('returns correct functions and state', () => {
    const result = setup(canvas!, updatePlayingState!, updateFpsData!, memory!);

    expect(getUniverse).toHaveBeenCalled();
    expect(setupGLRenderer).toHaveBeenCalled();
    expect(mockAnimationStateConstructor).toHaveBeenCalled();
    expect(mockRegisterOnUpdatePlayingState).toHaveBeenCalledWith(updatePlayingState);
    expect(FPS).toHaveBeenCalledWith(updateFpsData);
    expect(mockCanvasAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));

    // Ensure the correct functions are returned
    expect(typeof result.onTogglePlayPause).toBe('function');
    expect(result.animationState instanceof AnimationState).toBe(true);
    expect(typeof result.onNextFrame).toBe('function');
    expect(typeof result.onClickCanvasFnRef).toBe('function');
    expect(typeof result.destroy).toBe('function');

    expect(onClickPlayPauseButton).not.toHaveBeenCalled()
    // Simulate calling the toggle function
    result.onTogglePlayPause();
    // Ensure updatePlayingState was called with correct value
    expect(onClickPlayPauseButton).toHaveBeenCalledWith({ updateFpsData: expect.any(Function) }, expect.any(Object), memory, expect.any(Function), 0, 0, 0, animationState);

    expect(onClickNextFrameButton).not.toHaveBeenCalled()
    // Simulate calling the next frame function
    result.onNextFrame();
    expect(onClickNextFrameButton).toHaveBeenCalledWith(expect.any(Object), memory, expect.any(Function), 0, 0, 0);

    expect(onClickCanvas).not.toHaveBeenCalled()
    // Simulate clicking on canvas
    result.onClickCanvasFnRef();
    expect(onClickCanvas).toHaveBeenCalledWith(expect.any(Object), memory, expect.any(Function), 0, 0, 0, null);

    expect(mockDisposeGLRenderer).not.toHaveBeenCalled();
    result.destroy();
    expect(mockDisposeGLRenderer).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();

    // You can add more assertions here if necessary
  });

  // Add more tests as needed
});
