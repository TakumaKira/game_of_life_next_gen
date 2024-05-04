import destroyImpl from './destroyImpl';
import { DestroyedState } from './types';

describe('destroyImpl function', () => {
  let updatePlayingState: jest.Mock<void, [boolean]>;
  let onDestroy: jest.Mock<{ isDestroyed: boolean }, []>;
  let destroyedState: DestroyedState;

  beforeEach(() => {
    updatePlayingState = jest.fn();
    onDestroy = jest.fn().mockReturnValue({ isDestroyed: true });
    destroyedState = { isDestroyed: false };
  });

  it('should call updatePlayingState with false', () => {
    destroyImpl(onDestroy, updatePlayingState, destroyedState);

    expect(updatePlayingState).toHaveBeenCalledWith(false);
  });

  it('should update destroyedState based on onDestroy result', () => {
    destroyImpl(onDestroy, updatePlayingState, destroyedState);

    expect(destroyedState.isDestroyed).toBe(true);
  });

  it('should call onDestroy and updatePlayingState with false', () => {
    destroyImpl(onDestroy, updatePlayingState, destroyedState);

    expect(onDestroy).toHaveBeenCalled();
    expect(updatePlayingState).toHaveBeenCalledWith(false);
  });
});
