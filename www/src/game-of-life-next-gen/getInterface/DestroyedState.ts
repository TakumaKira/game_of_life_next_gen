export default class DestroyedState {
  private _isDestroyed = false;
  get isDestroyed() {
    return this._isDestroyed;
  }
  public destroy() {
    this._isDestroyed = true;
  }
}
