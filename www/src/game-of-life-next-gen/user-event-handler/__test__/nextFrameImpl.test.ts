// Import necessary dependencies and the function to test
import nextFrameImpl from '../nextFrameImpl';

describe('nextFrameImpl', () => {
  // Mock the necessary objects
  let universeTickMock: jest.Mock;
  let universeMock: { tick: jest.Mock };
  let updateUniverse: jest.Mock;

  beforeEach(() => {
    // Initialize mocks before each test
    universeTickMock = jest.fn();
    universeMock = { tick: universeTickMock };
    updateUniverse = jest.fn();
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it('ticks the universe, update universe without showing log', () => {
    // Call the function to test
    nextFrameImpl(universeMock as any, updateUniverse, undefined);

    // Expectations
    expect(universeTickMock).toHaveBeenCalledWith(false); // Ensure tick method is called with false
    expect(updateUniverse).toHaveBeenCalled(); // Ensure updateUniverse is called
  });

  it('ticks the universe, update universe with showing log', () => {
    // Call the function to test
    nextFrameImpl(universeMock as any, updateUniverse, true);

    // Expectations
    expect(universeTickMock).toHaveBeenCalledWith(true); // Ensure tick method is called with true
    expect(updateUniverse).toHaveBeenCalled(); // Ensure updateUniverse is called
  });
});
