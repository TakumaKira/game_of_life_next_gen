import type { AnimationState } from "@/game-of-life-next-gen/anim-controller";
import playImpl from "../playImpl";
import type DestroyedState from "../DestroyedState";

describe("playImpl function", () => {
  // Mock functions
  const onTogglePlayPause = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onTogglePlayPause if not playing and not destroyed", () => {
    const animationStateMock = {
      isPlaying: false
    } as AnimationState;
    const destroyedStateMock = {
      isDestroyed: false,
    } as DestroyedState;
    playImpl(onTogglePlayPause, animationStateMock, destroyedStateMock);
    expect(onTogglePlayPause).toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if playing", () => {
    const animationStateMock = {
      isPlaying: true
    } as AnimationState;
    const destroyedStateMock = {
      isDestroyed: false,
    } as DestroyedState;
    playImpl(onTogglePlayPause, animationStateMock, destroyedStateMock);
    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });

  it("should not call onTogglePlayPause if destroyed", () => {
    const animationStateMock = {
      isPlaying: false
    } as AnimationState;
    const destroyedStateMock = {
      isDestroyed: true,
    } as DestroyedState;
    playImpl(onTogglePlayPause, animationStateMock, destroyedStateMock);
    expect(onTogglePlayPause).not.toHaveBeenCalled();
  });
});
