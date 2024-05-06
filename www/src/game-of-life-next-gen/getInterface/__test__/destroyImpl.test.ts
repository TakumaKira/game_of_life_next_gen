import destroyImpl from "../destroyImpl";
import type { AnimationState } from "../../anim-controller";
import type DestroyedState from "../DestroyedState";

// Mock objects for testing
const onClickCanvasFnRefMock = jest.fn();
const canvasMock = {
  removeEventListener: jest.fn()
} as unknown as HTMLCanvasElement;
const destroySetupMock = jest.fn();

describe("destroyImpl function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not do anything if destroyedState.isDestroyed is true", () => {
    const animationStateMock = {
      isPlaying: false,
      cancel: jest.fn()
    } as unknown as AnimationState;
    const destroyedStateMock = {
      isDestroyed: true,
      destroy: jest.fn()
    } as unknown as DestroyedState;
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMock,
      destroySetupMock,
      destroyedStateMock
    );
    expect(onClickCanvasFnRefMock).not.toHaveBeenCalled();
    expect(animationStateMock.cancel).not.toHaveBeenCalled();
    expect(destroySetupMock).not.toHaveBeenCalled();
    expect(destroyedStateMock.destroy).not.toHaveBeenCalled();
  });

  it("should remove click event listener and call destroySetup and destroyedState.destroy if isDestroyed is false", () => {
    const animationStateMock = {
      isPlaying: false,
      cancel: jest.fn()
    } as unknown as AnimationState;
    const destroyedStateMock = {
      isDestroyed: false,
      destroy: jest.fn()
    } as unknown as DestroyedState;
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMock,
      destroySetupMock,
      destroyedStateMock
    );
    expect(canvasMock.removeEventListener).toHaveBeenCalledWith(
      "click",
      onClickCanvasFnRefMock
    );
    expect(animationStateMock.cancel).not.toHaveBeenCalled();
    expect(destroySetupMock).toHaveBeenCalled();
    expect(destroyedStateMock.destroy).toHaveBeenCalled();
  });

  it("should cancel animation if animationState.isPlaying is true", () => {
    const animationStateMockWithAnimation = {
      isPlaying: true,
      cancel: jest.fn()
    } as unknown as AnimationState;
    const destroyedStateMock = {
      isDestroyed: false,
      destroy: jest.fn()
    } as unknown as DestroyedState;
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMockWithAnimation,
      destroySetupMock,
      destroyedStateMock
    );
    expect(canvasMock.removeEventListener).toHaveBeenCalledWith(
      "click",
      onClickCanvasFnRefMock
    );
    expect(animationStateMockWithAnimation.cancel).toHaveBeenCalled();
    expect(destroySetupMock).toHaveBeenCalled();
    expect(destroyedStateMock.destroy).toHaveBeenCalled();
  });
});
