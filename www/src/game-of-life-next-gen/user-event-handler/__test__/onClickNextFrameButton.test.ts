// Import necessary dependencies and the function to test
import onClickNextFrameButton from './onClickNextFrameButton';
import { drawGrid, drawCells } from '@/game-of-life-next-gen/drawer';

// Mock dependencies
jest.mock('@/game-of-life-next-gen/drawer');

describe('onClickNextFrameButton', () => {
  // Mock the necessary objects
  let universeTickMock: jest.Mock;
  let universeMock: { tick: jest.Mock };
  let memory: WebAssembly.Memory;
  let updateTextureContext: jest.Mock;
  const width = 100;
  const height = 100;
  const lifeSpan = 100;

  beforeEach(() => {
    // Initialize mocks before each test
    universeTickMock = jest.fn();
    universeMock = { tick: universeTickMock };
    memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
    updateTextureContext = jest.fn();
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it('ticks the universe, draws grid, and draws cells', () => {
    // Call the function to test
    onClickNextFrameButton(universeMock as any, memory, updateTextureContext, width, height, lifeSpan);

    // Expectations
    expect(universeTickMock).toHaveBeenCalledWith(true); // Ensure tick method is called with true
    expect(drawGrid).toHaveBeenCalledWith(updateTextureContext, width, height); // Ensure drawGrid is called with correct arguments
    expect(drawCells).toHaveBeenCalledWith(universeMock as any, memory, updateTextureContext, width, height, lifeSpan); // Ensure drawCells is called with correct arguments
  });
});
