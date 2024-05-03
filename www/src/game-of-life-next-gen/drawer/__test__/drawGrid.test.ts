import drawGrid from './drawGrid';
import { CELL_SIZE, GRID_COLOR } from '@/game-of-life-next-gen/constants';

// Mocking updateTextureContext function
const mockUpdateTextureContext = jest.fn();

describe('drawGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should draw vertical and horizontal lines', () => {
    const width = 10;
    const height = 10;
    drawGrid(mockUpdateTextureContext, width, height);

    // Check if updateTextureContext is called
    expect(mockUpdateTextureContext).toHaveBeenCalled();

    // Get the passed context
    const contextMock = mockUpdateTextureContext.mock.calls[0][0];

    // Check if the context methods are called with correct parameters
    expect(contextMock.beginPath).toHaveBeenCalled();
    expect(contextMock.strokeStyle).toBe(GRID_COLOR);

    // Check vertical lines
    for (let i = 0; i <= width; i++) {
      expect(contextMock.moveTo).toHaveBeenCalledWith(i * (CELL_SIZE + 1) + 1, 0);
      expect(contextMock.lineTo).toHaveBeenCalledWith(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Check horizontal lines
    for (let j = 0; j <= height; j++) {
      expect(contextMock.moveTo).toHaveBeenCalledWith(0, j * (CELL_SIZE + 1) + 1);
      expect(contextMock.lineTo).toHaveBeenCalledWith((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    // Check stroke is called
    expect(contextMock.stroke).toHaveBeenCalled();
  });
});
