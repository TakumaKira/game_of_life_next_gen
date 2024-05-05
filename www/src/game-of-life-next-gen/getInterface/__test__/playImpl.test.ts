import type { AnimationState } from "@/game-of-life-next-gen/anim-controller";
import playImpl from "../playImpl";

describe("playImpl function", () => {
  // Mock functions
  const onTogglePlayPause = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onTogglePlayPause if not playing and not destroyed", () => {
    const destroyedState = { isDestroyed: false };
    const animationState = { isPlaying: false};

    playImpl(onTogglePlayPause, animationState as AnimationState, destroyedState);

    expect(onTogglePlayPause).toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if playing", () => {
    const destroyedState = { isDestroyed: false };
    const animationState = { isPlaying: true};

    playImpl(onTogglePlayPause, animationState as AnimationState, destroyedState);

    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if destroyed", () => {
    const destroyedState = { isDestroyed: true };
    const animationState = { isPlaying: false};

    playImpl(onTogglePlayPause, animationState as AnimationState, destroyedState);

    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });
});
