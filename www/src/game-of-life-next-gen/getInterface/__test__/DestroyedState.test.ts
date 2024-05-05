import DestroyedState from './DestroyedState';

describe('DestroyedState', () => {
  let destroyedState;

  beforeEach(() => {
    destroyedState = new DestroyedState();
  });

  test('initial state should not be destroyed', () => {
    expect(destroyedState.isDestroyed).toBe(false);
  });

  test('destroy() method should set isDestroyed to true', () => {
    destroyedState.destroy();
    expect(destroyedState.isDestroyed).toBe(true);
  });

  test('isDestroyed should remain true after destroy() is called', () => {
    destroyedState.destroy();
    destroyedState.destroy(); // calling destroy() again should not affect the state
    expect(destroyedState.isDestroyed).toBe(true);
  });

  test('isDestroyed should be false if destroy() is not called', () => {
    expect(destroyedState.isDestroyed).toBe(false);
  });
});
