import { DestroyedState } from "./types"

export default function destroyImpl(onDestroy: () => { isDestroyed: boolean }, updatePlayingState: (isPlaying: boolean) => void, destroyedState: DestroyedState) {
  updatePlayingState(false)
  destroyedState.isDestroyed = onDestroy().isDestroyed
}
