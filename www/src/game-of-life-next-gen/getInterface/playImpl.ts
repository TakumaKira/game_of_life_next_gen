import type { AnimationState } from "../anim-controller"
import type DestroyedState from "./DestroyedState"

export default function playImpl(onTogglePlayPause: () => void, animationState: AnimationState, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (animationState.isPlaying) {
    return
  }
  onTogglePlayPause()
}
