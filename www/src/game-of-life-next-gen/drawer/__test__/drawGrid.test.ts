import drawGrid from '../drawGrid';
import type { TextureColors } from '../types';

// Mocking updateTextureContext function
const mockUpdateTextureContext = jest.fn();

describe('drawGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should draw something with predefined color', () => {
    const textureColors: TextureColors = {
      gridColor: '#000000ff',
      deadColor: '#111111ff',
      aliveColors: ['#ff0000ff', '#ffff00ff', '#0000ffff']
    }
    const width = 10;
    const height = 10;
    const cellSize = 1;
    drawGrid(mockUpdateTextureContext, textureColors, width, height, cellSize);

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
    expect(mockContext.strokeStyle).toBe(textureColors.gridColor);

    // Check stroke is called
    expect(mockContext.stroke).toHaveBeenCalled();
  });
});
