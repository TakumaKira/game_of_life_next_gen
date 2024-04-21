import { Mesh, StandardMaterial } from 'babylonjs'

import { CellState } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import getIndex from "./getIndex";
import { ALIVE_CELL_COLORS, LIFE_SPAN } from "./constants";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, width: number, height: number, meshes: Mesh[], getNewRedMaterial: () => StandardMaterial, getNewYellowMaterial: () => StandardMaterial, getNewBlueMaterial: () => StandardMaterial, getNewBlackMaterial: () => StandardMaterial) {
  const cellsStatePtr = universe.cells_state();
  const cellsState = new Uint8Array(memory.buffer, cellsStatePtr, width * height);

  const cellsAgePtr = universe.cells_age();
  const cellsAge = new Uint8Array(memory.buffer, cellsAgePtr, width * height);

  for (let rangeIndex = 0; rangeIndex < ALIVE_CELL_COLORS.length; rangeIndex++) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col, width);
        if (cellsState[idx] !== CellState.Alive) {
          meshes[idx].material?.dispose()
          meshes[idx].material = getNewBlackMaterial()
          continue;
        }
        const isAgeInRange = ((age, lifeSpan, rangeIndex, rangeLength) => {
          const rangeSpan = lifeSpan / rangeLength
          return rangeSpan * rangeIndex <= age && age < rangeSpan * (rangeIndex + 1)
        })(cellsAge[idx], LIFE_SPAN, rangeIndex, ALIVE_CELL_COLORS.length);
        if (!isAgeInRange) {
          continue;
        }
        if (ALIVE_CELL_COLORS[rangeIndex] === '#FF0000') {
          meshes[idx].material?.dispose()
          meshes[idx].material = getNewRedMaterial()
        } else if (ALIVE_CELL_COLORS[rangeIndex] === '#FFFF00') {
          meshes[idx].material?.dispose()
          meshes[idx].material = getNewYellowMaterial()
        } else if (ALIVE_CELL_COLORS[rangeIndex] === '#0000FF') {
          meshes[idx].material?.dispose()
          meshes[idx].material = getNewBlueMaterial()
        } else {
          meshes[idx].material?.dispose()
          meshes[idx].material = getNewBlackMaterial()
        }
      }
    }
  }
}
