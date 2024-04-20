import { Cell } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import getIndex from "./getIndex";
import { ALIVE_COLOR, CELL_SIZE, DEAD_COLOR } from "./constants";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number) {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  context.beginPath();

  // Alive cells.
  context.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      if (cells[idx] !== Cell.Alive) {
        continue;
      }

      context.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  // Dead cells.
  context.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      if (cells[idx] !== Cell.Dead) {
        continue;
      }

      context.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  context.stroke();
}
