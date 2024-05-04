import { DestroyedState } from "./types"

export default function pauseImpl(onTogglePlayPause: () => void, getIsPlaying: () => boolean, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (!getIsPlaying()) {
    return
  }
  onTogglePlayPause()
}
