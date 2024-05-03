import FPS from './FPS';

describe('FPS', () => {
  let fps;
  let mockUpdateFpsData;

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
      jest.spyOn(performance, 'now').mockReturnValueOnce(1000); // Mock initial timestamp
      for (let i = 0; i < 10; i++) {
        fps.render();
      }
      // Mock FPS values for easier assertion
      fps.frames = [30, 40, 50, 20, 60, 70, 80, 90, 100, 110];

      fps.render();
      expect(mockUpdateFpsData).toHaveBeenCalledWith({
        fps: expect.any(Number),
        mean: 65, // (30 + 40 + 50 + 20 + 60 + 70 + 80 + 90 + 100 + 110) / 10
        min: 20,
        max: 110,
      });
    });
  });
});
