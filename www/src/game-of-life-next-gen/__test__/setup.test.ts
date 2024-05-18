// Import the function to test
import { AnimationState } from '../anim-controller';
import { FPS, getUniverse } from '../game-of-life';
import { setupGLRenderer } from '../gl-renderer';
import setup from '../setup';
import { UniverseConfig } from '../types';
import { onClickCanvas, nextFrameImpl, togglePlayPauseImpl } from '../user-event-handler';
import { drawCells, drawGrid } from "../drawer";
import { getCellSize } from '../constants';

// Mock imports
jest.mock('@/game-of-life-next-gen/drawer', () => ({
  drawGrid: jest.fn(),
  drawCells: jest.fn()
}));
// Mock dependencies as needed
jest.mock('@/game-of-life-next-gen/game-of-life', () => ({
  getUniverse: jest.fn(),
  FPS: jest.fn(() => ({ updateFpsData: jest.fn() })),
}));
jest.mock('@/game-of-life-next-gen/user-event-handler', () => ({
  onClickCanvas: jest.fn(),
  nextFrameImpl: jest.fn(),
  togglePlayPauseImpl: jest.fn(),
}));
const mockUpdateTextureContext = jest.fn()
const mockResetCamera = jest.fn();
const mockToggleGUIControlsVisibility = jest.fn();
const mockDisposeGLRenderer = jest.fn();
jest.mock('@/game-of-life-next-gen/gl-renderer', () => ({
  setupGLRenderer: jest.fn(() => ({
    updateTextureContext: mockUpdateTextureContext,
    resetCamera: mockResetCamera,
    toggleGUIControlsVisibility: mockToggleGUIControlsVisibility,
    dispose: mockDisposeGLRenderer,
  })),
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

const mockUniverseConfig = { fieldSize: 10, lifespan: 100, speed: 1, aliveCellBase: [1, 2] };
const mockGetUniverseReturn = { universe: {}, width: mockUniverseConfig.fieldSize, height: mockUniverseConfig.fieldSize, lifespan: mockUniverseConfig.lifespan };

describe('setup function', () => {
  let canvas: HTMLCanvasElement | null;
  let mockCanvasAddEventListener: jest.SpyInstance | null;
  let updatePlayingState: jest.Mock | null;
  let updateFpsData: jest.Mock | null;
  let memory: WebAssembly.Memory | null;
  let universeConfig: UniverseConfig | null;
  let animationState: AnimationState | null;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    mockCanvasAddEventListener = jest.spyOn(canvas, 'addEventListener');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
    memory = new WebAssembly.Memory({ initial: 1 });
    universeConfig = mockUniverseConfig;
    (getUniverse as jest.Mock).mockReturnValue(mockGetUniverseReturn);
    animationState = new AnimationState();
  });

  afterEach(() => {
    // Clean up after each test
    canvas = null;
    mockCanvasAddEventListener = null;
    updatePlayingState = null;
    updateFpsData = null;
    memory = null;
    universeConfig = null;
    animationState = null;
  });

  test('returns correct functions and state', () => {
    const result = setup(canvas!, updatePlayingState!, updateFpsData!, memory!, universeConfig!);

    expect(getUniverse).toHaveBeenCalledWith(universeConfig?.fieldSize, universeConfig?.lifespan, universeConfig?.aliveCellBase);
    expect(setupGLRenderer).toHaveBeenCalledWith(canvas, expect.any(Function));
    expect(mockAnimationStateConstructor).toHaveBeenCalled();
    expect(mockRegisterOnUpdatePlayingState).toHaveBeenCalledWith(updatePlayingState);
    expect(FPS).toHaveBeenCalledWith(updateFpsData);
    expect(mockCanvasAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));

    // Ensure the correct functions are returned
    expect(typeof result.togglePlayPause).toBe('function');
    expect(result.animationState instanceof AnimationState).toBe(true);
    expect(typeof result.nextFrame).toBe('function');
    expect(typeof result.onClickCanvasFnRef).toBe('function');
    expect(typeof result.resetCamera).toBe('function');
    expect(typeof result.toggleGUIControlsVisibility).toBe('function');
    expect(typeof result.destroy).toBe('function');

    expect(togglePlayPauseImpl).not.toHaveBeenCalled()
    // Simulate calling the toggle function
    result.togglePlayPause();
    // Ensure updatePlayingState was called with correct value
    expect(togglePlayPauseImpl).toHaveBeenCalledWith(
      { updateFpsData: expect.any(Function) }, // FPS
      mockGetUniverseReturn.universe,
      expect.any(Function), // updateUniverse
      animationState,
      universeConfig?.speed,
    );
    const updateUniverseCalledByTogglePlayPauseImpl = (togglePlayPauseImpl as jest.Mock).mock.calls[0][2]

    expect(nextFrameImpl).not.toHaveBeenCalled()
    // Simulate calling the next frame function
    const showLog = true
    result.nextFrame(showLog);
    expect(nextFrameImpl).toHaveBeenCalledWith(
      mockGetUniverseReturn.universe,
      expect.any(Function), // updateUniverse
      showLog,
    );
    const updateUniverseCalledByNextFrameImpl = (nextFrameImpl as jest.Mock).mock.calls[0][1]

    expect(onClickCanvas).not.toHaveBeenCalled()
    const onHoverTextureContext = (setupGLRenderer as jest.Mock).mock.calls[0][1]
    const hoverPos = { x: 10, z: 20 }
    onHoverTextureContext(hoverPos)
    // Simulate clicking on canvas
    result.onClickCanvasFnRef();
    expect(onClickCanvas).toHaveBeenCalledWith(
      mockGetUniverseReturn.universe,
      expect.any(Function), // updateUniverse
      hoverPos,
      universeConfig?.fieldSize,
    );
    const updateUniverseCalledByOnClickCanvas = (onClickCanvas as jest.Mock).mock.calls[0][1]

    expect(mockResetCamera).not.toHaveBeenCalled();
    result.resetCamera();
    expect(mockResetCamera).toHaveBeenCalled();

    expect(mockToggleGUIControlsVisibility).not.toHaveBeenCalled();
    result.toggleGUIControlsVisibility();
    expect(mockToggleGUIControlsVisibility).toHaveBeenCalled();

    expect(mockDisposeGLRenderer).not.toHaveBeenCalled();
    result.destroy();
    expect(mockDisposeGLRenderer).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();

    expect(updateUniverseCalledByTogglePlayPauseImpl).toEqual(updateUniverseCalledByNextFrameImpl);
    expect(updateUniverseCalledByNextFrameImpl).toEqual(updateUniverseCalledByOnClickCanvas);

    updateUniverseCalledByTogglePlayPauseImpl()
    expect(drawGrid).toHaveBeenCalledWith(
      mockUpdateTextureContext,
      mockGetUniverseReturn.width,
      mockGetUniverseReturn.height,
      getCellSize(universeConfig?.fieldSize!),
    )
    expect(drawCells).toHaveBeenCalledWith(
      mockGetUniverseReturn.universe,
      memory,
      mockUpdateTextureContext,
      mockGetUniverseReturn.width,
      mockGetUniverseReturn.height,
      universeConfig?.lifespan,
      getCellSize(universeConfig?.fieldSize!),
    )

    // You can add more assertions here if necessary
  });

  // Add more tests as needed
});
