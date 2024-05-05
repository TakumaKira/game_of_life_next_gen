import type { AnimationState } from "../anim-controller"
import type { DestroyedState } from "./types"

export default function pauseImpl(onTogglePlayPause: () => void, animationState: AnimationState, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (animationState.isPlaying === false) {
    return
  }
  onTogglePlayPause()
}