import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { FIELD_SIZE } from "@/game-of-life-next-gen/constants";
import { drawGrid, drawCells } from "@/game-of-life-next-gen/drawer";
import type { OnTextureHoverPositionFn, TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";

export default function onClickCanvas(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, onTextureHoverPosition: OnTextureHoverPositionFn): void {
  if (!onTextureHoverPosition) {
    return
  }

  const row = Math.floor((20 - (onTextureHoverPosition.z + 10)) / 20 * FIELD_SIZE);
  const col = Math.floor((onTextureHoverPosition.x + 10) / 20 * FIELD_SIZE);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, updateTextureContext, width, height, lifeSpan);
  drawGrid(updateTextureContext, width, height);
}
