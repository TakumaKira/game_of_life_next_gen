import destroyImpl from "./destroyImpl";
import { AnimationState } from "../anim-controller";

// Mock objects for testing
const onClickCanvasFnRefMock = jest.fn();
const canvasMock = document.createElement("canvas");
const animationStateMock: AnimationState = {
  isPlaying: false,
  cancel: jest.fn()
};
const destroySetupMock = jest.fn();
const destroyedStateMock = {
  isDestroyed: false,
  destroy: jest.fn()
};

describe("destroyImpl function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not do anything if destroyedState.isDestroyed is true", () => {
    const destroyedStateMock = { isDestroyed: true };
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMock,
      destroySetupMock,
      destroyedStateMock
    );
    expect(onClickCanvasFnRefMock).not.toBeCalled();
    expect(animationStateMock.cancel).not.toBeCalled();
    expect(destroySetupMock).not.toBeCalled();
    expect(destroyedStateMock.destroy).not.toBeCalled();
  });

  it("should remove click event listener and call destroySetup and destroyedState.destroy if isDestroyed is false", () => {
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMock,
      destroySetupMock,
      destroyedStateMock
    );
    expect(canvasMock.removeEventListener).toBeCalledWith(
      "click",
      onClickCanvasFnRefMock
    );
    expect(animationStateMock.cancel).not.toBeCalled();
    expect(destroySetupMock).toBeCalled();
    expect(destroyedStateMock.destroy).toBeCalled();
  });

  it("should cancel animation if animationState.isPlaying is true", () => {
    const animationStateMockWithAnimation: AnimationState = {
      isPlaying: true,
      cancel: jest.fn()
    };
    destroyImpl(
      onClickCanvasFnRefMock,
      canvasMock,
      animationStateMockWithAnimation,
      destroySetupMock,
      destroyedStateMock
    );
    expect(animationStateMockWithAnimation.cancel).toBeCalled();
  });
});
