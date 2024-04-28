import { CELL_SIZE, GRID_COLOR } from "./constants";
import type { TextContextUpdateFn } from "./setupBabylon";

export default function drawGrid(updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number): void {
  updateTextureContext(context => {
    context.beginPath();
    context.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      context.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      context.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      context.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
      context.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    context.stroke();
  })
}
