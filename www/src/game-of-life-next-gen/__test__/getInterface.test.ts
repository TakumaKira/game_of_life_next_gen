import getInterface from '../getInterface';
import buildWasmModule from 'wasm-game-of-life/wasm_game_of_life_bg.wasm';
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

const mockWasmModule = {
  memory: {},
}
jest.mock('wasm-game-of-life/wasm_game_of_life_bg.wasm', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(mockWasmModule),
}))

const mockBg = {
  __wbg_set_wasm: jest.fn(),
}
jest.mock('was-game-of-life/wasm_game_of_life_bg.js', () => mockBg)

jest.mock('../onDestroy', () => ({
  default: jest.fn().mockReturnValue({ isDestroyed: true }),
}))

const mockOnTogglePlayPause = jest.fn();
const mockGetIsPlaying = jest.fn();
const mockNextFrame = jest.fn();
const mockOnClickCanvasFnRef = jest.fn();
const mockDispose = jest.fn();
jest.mock('../setup', () => ({
  setup: jest.fn().mockReturnValue({
    onTogglePlayPause: mockOnTogglePlayPause,
    getIsPlaying: mockGetIsPlaying,
    onNextFrame: mockNextFrame,
    onClickCanvasFnRef: mockOnClickCanvasFnRef,
    dispose: mockDispose,
  }),
}))

describe('getInterface', () => {
  let canvas: HTMLCanvasElement;
  let updatePlayingState: jest.Mock;
  let updateFpsData: jest.Mock;
  let interfaceInstance: { play: () => void, pause: () => void, nextFrame: () => void, destroy: () => void };

  beforeEach(() => {
    canvas = document.createElement('canvas');
    updatePlayingState = jest.fn();
    updateFpsData = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets up the wasm module correctly', async () => {
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(buildWasmModule).toHaveBeenCalledWith({'./wasm_game_of_life_bg.js': bg})
    expect(mockBg.__wbg_set_wasm).toHaveBeenCalledWith(mockWasmModule);
  });

  it('initializes and returns the interface', async () => {
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData);
    expect(interfaceInstance).toBeDefined();
    expect(interfaceInstance.play).toBeInstanceOf(Function);
    expect(interfaceInstance.pause).toBeInstanceOf(Function);
    expect(interfaceInstance.nextFrame).toBeInstanceOf(Function);
    expect(interfaceInstance.destroy).toBeInstanceOf(Function);
  });

  it('plays the animation on initialization when autoStart is true', async () => {
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData, true);
    expect(mockOnTogglePlayPause).toHaveBeenCalledWith(true);
  });

  it('does not play the animation on initialization when autoStart is false', async () => {
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData, false);
    expect(mockOnTogglePlayPause).toHaveBeenCalledWith(true);
  });

  it('toggles play state correctly', async () => {
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData, true);

    mockGetIsPlaying.mockReturnValueOnce(true);
    interfaceInstance.play();
    expect(mockOnTogglePlayPause).not.toHaveBeenCalled();

    mockGetIsPlaying.mockReturnValueOnce(false);
    interfaceInstance.play();
    expect(mockOnTogglePlayPause).toHaveBeenCalledWith(true);

    interfaceInstance.pause();
    expect(mockOnTogglePlayPause).toHaveBeenCalledWith(false);
  });

  it('advances animation correctly', () => {
    interfaceInstance.play(); // start the animation

    expect(mockOnTogglePlayPause).toHaveBeenCalledTimes(0);
    interfaceInstance.nextFrame();
    expect(mockOnTogglePlayPause).toHaveBeenCalledTimes(1);
  });

  it('cleans up resources and stops animation on destruction', () => {
    const onDestroyMock = jest.spyOn(interfaceInstance, 'destroy');
    interfaceInstance.destroy();

    expect(updatePlayingState).toHaveBeenCalledWith(false);
    expect(onDestroyMock).toHaveBeenCalled();
  });

  it('does not allow play/pause/nextFrame after destruction', () => {
    const onDestroyMock = jest.spyOn(interfaceInstance, 'destroy');
    interfaceInstance.destroy();

    interfaceInstance.play();
    expect(mockOnTogglePlayPause).not.toHaveBeenCalled();

    interfaceInstance.pause();
    expect(mockOnTogglePlayPause).not.toHaveBeenCalled();

    interfaceInstance.nextFrame();
    expect(mockOnTogglePlayPause).not.toHaveBeenCalled();
  });
});
