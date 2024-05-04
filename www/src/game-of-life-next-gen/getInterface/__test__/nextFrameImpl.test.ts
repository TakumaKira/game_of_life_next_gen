import nextFrameImpl from '../nextFrameImpl';
import type { DestroyedState } from '../types';

// Mock functions
const onNextFrameMock = jest.fn();
const pauseMock = jest.fn();
const getIsPlayingMock = jest.fn();

describe('nextFrameImpl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls onNextFrame() when destroyedState.isDestroyed is false', () => {
    const destroyedState: DestroyedState = { isDestroyed: false };
    nextFrameImpl(onNextFrameMock, pauseMock, getIsPlayingMock, destroyedState);
    expect(onNextFrameMock).toHaveBeenCalled();
    expect(pauseMock).not.toHaveBeenCalled();
  });

  it('does not call onNextFrame() when destroyedState.isDestroyed is true', () => {
    const destroyedState: DestroyedState = { isDestroyed: true };
    nextFrameImpl(onNextFrameMock, pauseMock, getIsPlayingMock, destroyedState);
    expect(onNextFrameMock).not.toHaveBeenCalled();
    expect(pauseMock).not.toHaveBeenCalled();
  });

  it('calls pause() when getIsPlaying() returns true', () => {
    const destroyedState: DestroyedState = { isDestroyed: false };
    getIsPlayingMock.mockReturnValueOnce(true);
    nextFrameImpl(onNextFrameMock, pauseMock, getIsPlayingMock, destroyedState);
    expect(pauseMock).toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });

  it('does not call pause() when getIsPlaying() returns false', () => {
    const destroyedState: DestroyedState = { isDestroyed: false };
    getIsPlayingMock.mockReturnValueOnce(false);
    nextFrameImpl(onNextFrameMock, pauseMock, getIsPlayingMock, destroyedState);
    expect(pauseMock).not.toHaveBeenCalled();
    expect(onNextFrameMock).toHaveBeenCalled();
  });
});
