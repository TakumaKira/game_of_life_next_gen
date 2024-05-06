import drawGrid from '../drawGrid';
import { GRID_COLOR } from '@/game-of-life-next-gen/constants';

// Mocking updateTextureContext function
const mockUpdateTextureContext = jest.fn();

describe('drawGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should draw something with predefined color', () => {
    const width = 10;
    const height = 10;
    drawGrid(mockUpdateTextureContext, width, height);

    // Check if updateTextureContext is called
    expect(mockUpdateTextureContext).toHaveBeenCalled();

    // Get the passed context function
    const contextFunction = mockUpdateTextureContext.mock.calls[0][0];

    // Mock canvas context
    const mockContext = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: undefined,
    };

    // Call the context function with the mock context
    contextFunction(mockContext);

    // Check if the context methods are called with correct parameters
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.strokeStyle).toBe(GRID_COLOR);

    // Check stroke is called
    expect(mockContext.stroke).toHaveBeenCalled();
  });
});
