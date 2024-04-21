import { Color3,  MeshBuilder, Scene, Vector3 } from 'babylonjs'

import { CellState } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import getIndex from "./getIndex";
import { ALIVE_CELL_COLORS, LIFE_SPAN } from "./constants";

export default function drawCells(universe: Universe, memory: WebAssembly.Memory, width: number, height: number, scene: Scene) {
  const cellsStatePtr = universe.cells_state();
  const cellsState = new Uint8Array(memory.buffer, cellsStatePtr, width * height);

  const cellsAgePtr = universe.cells_age();
  const cellsAge = new Uint8Array(memory.buffer, cellsAgePtr, width * height);

  for (let rangeIndex = 0; rangeIndex < ALIVE_CELL_COLORS.length; rangeIndex++) {
    const circleMesh = MeshBuilder.CreateDisc("circle", { radius: 0.5, tessellation: 50 }, scene);
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.registerInstancedBuffer("color", 3)
    if (ALIVE_CELL_COLORS[rangeIndex] === '#FF0000') {
      circleMesh.instancedBuffers.color = new Color3(1, 0, 0)
    } else if (ALIVE_CELL_COLORS[rangeIndex] === '#FFFF00') {
      circleMesh.instancedBuffers.color = new Color3(1, 1, 0)
    } else if (ALIVE_CELL_COLORS[rangeIndex] === '#0000FF') {
      circleMesh.instancedBuffers.color = new Color3(0, 0, 1)
    }
    const circlePositions = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col, width);
        if (cellsState[idx] !== CellState.Alive) {
          continue;
        }
        const isAgeInRange = ((age, lifeSpan, rangeIndex, rangeLength) => {
          const rangeSpan = lifeSpan / rangeLength
          return rangeSpan * rangeIndex <= age && age < rangeSpan * (rangeIndex + 1)
        })(cellsAge[idx], LIFE_SPAN, rangeIndex, ALIVE_CELL_COLORS.length);
        if (!isAgeInRange) {
          continue;
        }
        circlePositions.push(new Vector3(col, 0, row));
        for (let i = 0; i < circlePositions.length; i++) {
          const newInstance = circleMesh.createInstance("circleInstance" + i);
          newInstance.position = circlePositions[i];
        }
      }
    }
  }
}
