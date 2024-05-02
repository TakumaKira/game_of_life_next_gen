export default class FPS {
  updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void;
  frames: number[] = [];
  lastFrameTimeStamp = performance.now();

  constructor(updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void) {
    this.updateFpsData = updateFpsData
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (const fps of this.frames) {
      sum += fps;
      min = Math.min(fps, min);
      max = Math.max(fps, max);
    }
    let mean = sum / this.frames.length;

    // Update the statistics.
    this.updateFpsData({ fps, mean, min, max });
  }
}
