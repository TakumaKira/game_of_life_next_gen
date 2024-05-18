import { CellState } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { getIndex } from "@/game-of-life-next-gen/game-of-life";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import getIsAgeInRange from "./getIsAgeInRange";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifespan: number, cellSize: number) {
  const cellsStatePtr = universe.cells_state();
  const cellsState = new Uint8Array(memory.buffer, cellsStatePtr, width * height);

  const cellsAgePtr = universe.cells_age();
  const cellsAge = new Uint8Array(memory.buffer, cellsAgePtr, width * height);

  updateTextureContext((context, textureValues) => {
    context.beginPath();

    // Alive cells.
    for (let rangeIndex = 0; rangeIndex < textureValues.aliveColors.length; rangeIndex++) {
      context.fillStyle = textureValues.aliveColors[rangeIndex].toHexString();
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          const idx = getIndex(row, col, width);
          if (cellsState[idx] !== CellState.Alive) {
            continue;
          }
          const isAgeInRange = getIsAgeInRange(cellsAge[idx], lifespan, rangeIndex, textureValues.aliveColors.length);
          if (!isAgeInRange) {
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
    }

    // Dead cells.
    context.fillStyle = textureValues.deadColor.toHexString();
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col, width);
        if (cellsState[idx] !== CellState.Dead) {
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
  })
}
