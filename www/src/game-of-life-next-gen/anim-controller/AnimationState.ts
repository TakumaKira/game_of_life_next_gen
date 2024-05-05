export default class AnimationState {
  private onUpdatePlayingStateFnList: Array<(isPlaying: boolean) => void> = []
  private _currentId: null | number = null
  private get currentId(): null | number {
    return this._currentId
  }
  private set currentId(value: null | number) {
    let shouldExecuteUpdatePlayingStateFn = false
    if (
      (this._currentId === null && typeof value === 'number')
      || (typeof this._currentId === 'number' && value === null)
    ) {
      shouldExecuteUpdatePlayingStateFn = true
    }
    this._currentId = value
    if (shouldExecuteUpdatePlayingStateFn === true) {
      this.onUpdatePlayingStateFnList.forEach((fn) => {
        fn(this.isPlaying)
      })
    }
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
  registerOnUpdatePlayingState(onUpdatePlayingState: (isPlaying: boolean) => void) {
    this.onUpdatePlayingStateFnList.push(onUpdatePlayingState)
  }
  unregisterAllOfOnUpdatePlayingState() {
    this.onUpdatePlayingStateFnList = []
  }
}
