import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import type { TextureColors } from "./types";

export default function drawGrid(updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, textureColors: TextureColors, width: number, height: number, cellSize: number): void {
  updateTextureContext(context => {
    context.beginPath();
    context.strokeStyle = textureColors.gridColor;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      context.moveTo(i * (cellSize + 1) + 1, 0);
      context.lineTo(i * (cellSize + 1) + 1, (cellSize + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      context.moveTo(0, j * (cellSize + 1) + 1);
      context.lineTo((cellSize + 1) * width + 1, j * (cellSize + 1) + 1);
    }

    context.stroke();
  })
}
