import type { AnimationState } from "../anim-controller"
import type { DestroyedState } from "./types"

export default function nextFrameImpl(onNextFrame: () => void, animationState: AnimationState, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (animationState.isPlaying === true) {
    animationState.cancel()
  }
  onNextFrame()
}