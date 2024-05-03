import type { UpdateFpsDataFn } from "./types";

export default class FPS {
  updateFpsData: UpdateFpsDataFn;
  FRAMES_LENGTH = 100;
  frames: number[] = new Array(this.FRAMES_LENGTH).fill(null);
  framesPointer = 0;
  framesUsedLength = 0;
  lastFrameTimeStamp = performance.now();

  constructor(updateFpsData: UpdateFpsDataFn) {
    this.updateFpsData = updateFpsData
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    this.frames[this.framesPointer] = fps;
    this.framesPointer++;
    if (this.framesUsedLength < this.FRAMES_LENGTH) {
      this.framesUsedLength++;
    }
    if (this.framesPointer >= this.FRAMES_LENGTH) {
      this.framesPointer = 0;
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (const fps of this.frames) {
      if (fps === null) {
        continue;
      }
      sum += fps;
      min = Math.min(fps, min);
      max = Math.max(fps, max);
    }
    let mean = sum / this.framesUsedLength;

    // Update the statistics.
    this.updateFpsData({ fps, mean, min, max });
  }
}
