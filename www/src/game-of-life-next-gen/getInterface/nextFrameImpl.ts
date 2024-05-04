import { DestroyedState } from "./types"

export default function nextFrameImpl(onNextFrame: () => void, pause: () => void, getIsPlaying: () => boolean, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (getIsPlaying()) {
    pause()
  }
  onNextFrame()
}
