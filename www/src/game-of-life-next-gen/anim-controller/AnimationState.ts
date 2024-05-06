import type { OnUpdatePlayingStateFn } from "./types"

export default class AnimationState {
  private onUpdatePlayingStateFnList: Array<OnUpdatePlayingStateFn> = []
  private _currentId: null | number = null
  private get currentId(): null | number {
    return this._currentId
  }
  private set currentId(value: null | number) {
    const shouldExecuteUpdatePlayingStateFn = this.shouldExecuteUpdatePlayingStateFn(this._currentId, value)
    this._currentId = value
    if (shouldExecuteUpdatePlayingStateFn === true) {
      this.onUpdatePlayingStateFnList.forEach((fn) => {
        fn(this.isPlaying)
      })
    }
  }
  private shouldExecuteUpdatePlayingStateFn(currentValue: null | number, nextValue: null | number) {
    return (
      (currentValue === null && typeof nextValue === 'number')
      || (typeof currentValue === 'number' && nextValue === null)
    )
  }
  requestNextFrame(nextJob: () => void) {
    this.currentId = requestAnimationFrame(nextJob)
  }
  get isPlaying() {
    return this.currentId !== null
  }
  cancel() {
    if (this.currentId === null) {
      return
    }
    cancelAnimationFrame(this.currentId)
    this.currentId = null
  }
  registerOnUpdatePlayingState(onUpdatePlayingState: OnUpdatePlayingStateFn) {
    this.onUpdatePlayingStateFnList.push(onUpdatePlayingState)
  }
  private unregisterAllOfOnUpdatePlayingState() {
    this.onUpdatePlayingStateFnList = []
  }
  clear() {
    this.unregisterAllOfOnUpdatePlayingState()
    this.cancel()
  }
}
