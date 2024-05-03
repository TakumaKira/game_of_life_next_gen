import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { drawGrid, drawCells } from "@/game-of-life-next-gen/drawer";
import type { OnTextureHoverPosition, TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import getRowColFromTextureHoverPosition from "./getRowColFromTextureHoverPosition";

export default function onClickCanvas(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, onTextureHoverPosition: OnTextureHoverPosition): void {
  if (!onTextureHoverPosition) {
    return
  }
  const { row, col } = getRowColFromTextureHoverPosition(onTextureHoverPosition);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, updateTextureContext, width, height, lifeSpan);
  drawGrid(updateTextureContext, width, height);
}
