import { CELL_SIZE } from "./constants";

/**
 * Give the canvas room for all of our cells and a 1px border
 * around each of them.
 */
export default function setCanvasDimensions(canvas: HTMLCanvasElement, width: number, height: number): void {
  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;
}
