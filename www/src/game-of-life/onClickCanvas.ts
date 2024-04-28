import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { FIELD_SIZE } from "./constants";
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import type { TextContextUpdateFn } from "./setupBabylon";

export default function onClickCanvas(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, hoverPos: { x: number, z: number } | null): void {
  if (!hoverPos) {
    return
  }

  const row = Math.floor((20 - (hoverPos.z + 10)) / 20 * FIELD_SIZE);
  const col = Math.floor((hoverPos.x + 10) / 20 * FIELD_SIZE);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, updateTextureContext, width, height);
  drawGrid(updateTextureContext, width, height);
}
