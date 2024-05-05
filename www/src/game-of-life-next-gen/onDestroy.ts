import type { AnimationState } from "./anim-controller"

export default function onDestroy(onClickCanvasFnRef: () => void, canvas: HTMLCanvasElement, animationState: AnimationState, destroySetup: () => void): { isDestroyed: boolean } {
  canvas.removeEventListener("click", onClickCanvasFnRef)
  if (animationState.isPlaying === true) {
    animationState.cancel()
  }
  destroySetup()
  return { isDestroyed: true }
}
