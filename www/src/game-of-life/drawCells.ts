import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import getIndex from "./getIndex";

export default function drawCells(universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number, context: CanvasRenderingContext2D, aliveColor: string, deadColor: string, cellSize: number, Cell: typeof bg.Cell) {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  context.beginPath();

  // Alive cells.
  context.fillStyle = aliveColor;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      if (cells[idx] !== Cell.Alive) {
        continue;
      }

      context.fillRect(
        col * (cellSize + 1) + 1,
        row * (cellSize + 1) + 1,
        cellSize,
        cellSize
      );
    }
  }

  // Dead cells.
  context.fillStyle = deadColor;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      if (cells[idx] !== Cell.Dead) {
        continue;
      }

      context.fillRect(
        col * (cellSize + 1) + 1,
        row * (cellSize + 1) + 1,
        cellSize,
        cellSize
      );
    }
  }

  context.stroke();
}
