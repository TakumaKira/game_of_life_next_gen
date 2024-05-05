import type { AnimationState } from "../anim-controller"
import type { DestroyedState } from "./types"

export default function playImpl(onTogglePlayPause: () => void, animationState: AnimationState, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (animationState.isPlaying) {
    return
  }
  onTogglePlayPause()
}
