import { CellState } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import getIndex from "./getIndex";
import { ALIVE_COLORS, CELL_SIZE, DEAD_COLOR, LIFE_SPAN } from "./constants";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number) {
  const cellsStatePtr = universe.cells_state();
  const cellsState = new Uint8Array(memory.buffer, cellsStatePtr, width * height);

  const cellsAgePtr = universe.cells_age();
  const cellsAge = new Uint8Array(memory.buffer, cellsAgePtr, width * height);

  context.beginPath();

  // Alive cells.
  for (let rangeIndex = 0; rangeIndex < ALIVE_COLORS.length; rangeIndex++) {
    context.fillStyle = ALIVE_COLORS[rangeIndex];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col, width);
        if (cellsState[idx] !== CellState.Alive) {
          continue;
        }
        const isAgeInRange = ((age, lifeSpan, rangeIndex, rangeLength) => {
          const rangeSpan = lifeSpan / rangeLength
          return rangeSpan * rangeIndex <= age && age < rangeSpan * (rangeIndex + 1)
        })(cellsAge[idx], LIFE_SPAN, rangeIndex, ALIVE_COLORS.length);
        if (!isAgeInRange) {
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
  }

  // Dead cells.
  context.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      if (cellsState[idx] !== CellState.Dead) {
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
