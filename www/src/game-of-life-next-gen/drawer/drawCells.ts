import { CellState } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { getIndex } from "@/game-of-life-next-gen/game-of-life";
import { ALIVE_COLORS, CELL_SIZE, DEAD_COLOR } from "@/game-of-life-next-gen/constants";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import getIsAgeInRange from "./getIsAgeInRange";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number) {
  const cellsStatePtr = universe.cells_state();
  const cellsState = new Uint8Array(memory.buffer, cellsStatePtr, width * height);

  const cellsAgePtr = universe.cells_age();
  const cellsAge = new Uint8Array(memory.buffer, cellsAgePtr, width * height);

  updateTextureContext(context => {
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
          const isAgeInRange = getIsAgeInRange(cellsAge[idx], lifeSpan, rangeIndex, ALIVE_COLORS.length);
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
  })
}
