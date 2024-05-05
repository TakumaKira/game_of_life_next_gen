import type { AnimationState } from "./anim-controller"

export default function onDestroy(onClickCanvasFnRef: () => void, canvas: HTMLCanvasElement, animationState: AnimationState, destroy: () => void): { isDestroyed: boolean } {
  canvas.removeEventListener("click", onClickCanvasFnRef)
  if (animationState.isPlaying === true) {
    animationState.cancel()
  }
  destroy()
  return { isDestroyed: true }
}
