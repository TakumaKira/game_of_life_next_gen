import type { AnimationState } from "../anim-controller";
import type DestroyedState from "./DestroyedState";

export default function destroyImpl(onClickCanvasFnRef: () => void, canvas: HTMLCanvasElement, animationState: AnimationState, destroySetup: () => void, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  canvas.removeEventListener("click", onClickCanvasFnRef)
  if (animationState.isPlaying === true) {
    animationState.cancel()
  }
  destroySetup()
  destroyedState.destroy()
}
