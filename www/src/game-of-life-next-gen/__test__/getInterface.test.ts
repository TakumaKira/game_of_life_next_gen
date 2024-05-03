import getInterface from './your-module'; // adjust the import path as needed

describe('getInterface', () => {
  let interfaceInstance;

  beforeEach(async () => {
    const canvas = document.createElement('canvas');
    const updatePlayingState = jest.fn();
    const updateFpsData = jest.fn();
    interfaceInstance = await getInterface(canvas, updatePlayingState, updateFpsData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes and returns the interface', () => {
    expect(interfaceInstance).toBeDefined();
    expect(interfaceInstance.play).toBeInstanceOf(Function);
    expect(interfaceInstance.pause).toBeInstanceOf(Function);
    expect(interfaceInstance.nextFrame).toBeInstanceOf(Function);
    expect(interfaceInstance.destroy).toBeInstanceOf(Function);
  });

  it('toggles play state correctly', () => {
    interfaceInstance.play();
    expect(updatePlayingState).toHaveBeenCalledWith(true);

    interfaceInstance.pause();
    expect(updatePlayingState).toHaveBeenCalledWith(false);
  });

  it('advances animation correctly', () => {
    const onNextFrame = jest.spyOn(interfaceInstance, 'nextFrame');
    interfaceInstance.play(); // start the animation

    expect(onNextFrame).toHaveBeenCalledTimes(0);
    interfaceInstance.nextFrame();
    expect(onNextFrame).toHaveBeenCalledTimes(1);
  });

  it('cleans up resources and stops animation on destruction', () => {
    const onDestroyMock = jest.spyOn(interfaceInstance, 'destroy');
    interfaceInstance.destroy();

    expect(updatePlayingState).toHaveBeenCalledWith(false);
    expect(onDestroyMock).toHaveBeenCalled();
  });
});
