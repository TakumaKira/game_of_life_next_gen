import { DestroyedState } from "./types"

export default function destroyImpl(onDestroy: () => { isDestroyed: boolean }, destroyedState: DestroyedState) {
  destroyedState.isDestroyed = onDestroy().isDestroyed
}
