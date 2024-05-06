import FPS from '../FPS';
import type { OnUpdateFpsDataFn } from '../types';

describe('FPS', () => {
  let fps: FPS;
  let mockUpdateFpsData: OnUpdateFpsDataFn;

  beforeEach(() => {
    mockUpdateFpsData = jest.fn();
    fps = new FPS(mockUpdateFpsData);
  });

  describe('render', () => {
    it('should calculate FPS and update FPS data correctly', () => {
      jest.spyOn(performance, 'now').mockReturnValueOnce(1000); // Mock initial timestamp
      fps.render();
      expect(mockUpdateFpsData).toHaveBeenCalledWith(expect.objectContaining({
        fps: expect.any(Number),
        mean: expect.any(Number),
        min: expect.any(Number),
        max: expect.any(Number),
      }));
    });

    it('should keep track of the last 100 frame timings', () => {
      jest.spyOn(performance, 'now').mockReturnValueOnce(1000); // Mock initial timestamp
      for (let i = 0; i < 150; i++) {
        fps.render();
      }
      expect(fps.frames.length).toBe(100);
    });

    it('should compute the minimum, maximum, and mean FPS accurately', () => {
      // Mock initial timestamp
      jest.spyOn(performance, 'now').mockReturnValueOnce(1000);
    
      // Mock FPS values for easier assertion
      const mockFpsValues = [30, 40, 50, 20, 60, 70, 80, 90, 100, 110];
    
      fps.frames = mockFpsValues;
      fps.FRAMES_LENGTH = mockFpsValues.length;
      fps.framesUsedLength = mockFpsValues.length;
    
      fps.render();
    
      // Calculate the expected mean FPS
      const expectedMean = mockFpsValues.reduce((acc, val) => acc + val, 0) / mockFpsValues.length;
    
      expect(mockUpdateFpsData).toHaveBeenCalledWith({
        fps: expect.any(Number),
        mean: expectedMean,
        min: Math.min(...mockFpsValues),
        max: Math.max(...mockFpsValues),
      });
    });
  });
});
