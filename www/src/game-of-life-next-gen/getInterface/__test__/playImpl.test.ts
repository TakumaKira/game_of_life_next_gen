import playImpl from "./playImpl";

describe("playImpl function", () => {
  // Mock functions
  const onTogglePlayPause = jest.fn();
  const getIsPlaying = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onTogglePlayPause if not playing and not destroyed", () => {
    const destroyedState = { isDestroyed: false };
    getIsPlaying.mockReturnValue(false);

    playImpl(onTogglePlayPause, getIsPlaying, destroyedState);

    expect(onTogglePlayPause).toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if playing", () => {
    const destroyedState = { isDestroyed: false };
    getIsPlaying.mockReturnValue(true);

    playImpl(onTogglePlayPause, getIsPlaying, destroyedState);

    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if destroyed", () => {
    const destroyedState = { isDestroyed: true };

    playImpl(onTogglePlayPause, getIsPlaying, destroyedState);

    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });
});
