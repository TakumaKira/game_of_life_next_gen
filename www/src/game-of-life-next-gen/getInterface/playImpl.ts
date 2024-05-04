import { DestroyedState } from "./types"

export default function playImpl(onTogglePlayPause: () => void, getIsPlaying: () => boolean, destroyedState: DestroyedState) {
  if (destroyedState.isDestroyed) {
    return
  }
  if (getIsPlaying()) {
    return
  }
  onTogglePlayPause()
}
