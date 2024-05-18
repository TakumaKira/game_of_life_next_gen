import type { AnimationState } from "../anim-controller"
import type DestroyedState from "./DestroyedState"

export default function nextFrameImpl(onNextFrame: (showLog?: boolean) => void, animationState: AnimationState, destroyedState: DestroyedState, showLog?: boolean) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (animationState.isPlaying === true) {
    animationState.cancel()
  }
  onNextFrame(showLog)
}
