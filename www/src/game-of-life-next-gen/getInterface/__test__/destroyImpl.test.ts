import destroyImpl from '../destroyImpl';
import type { DestroyedState } from '../types';

describe('destroyImpl function', () => {
  let onDestroy: jest.Mock<{ isDestroyed: boolean }, []>;
  let destroyedState: DestroyedState;

  beforeEach(() => {
    onDestroy = jest.fn().mockReturnValue({ isDestroyed: true });
    destroyedState = { isDestroyed: false };
  });

  it('should call onDestroy', () => {
    destroyImpl(onDestroy, destroyedState);

    expect(onDestroy).toHaveBeenCalled();
  });

  it('should update destroyedState based on onDestroy result', () => {
    destroyImpl(onDestroy, destroyedState);

    expect(destroyedState.isDestroyed).toBe(true);
  });
});
