import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { OnTextureHoverPosition } from "@/game-of-life-next-gen/gl-renderer";
import getRowColFromTextureHoverPosition from "./getRowColFromTextureHoverPosition";

export default function onClickCanvas(universe: Universe, updateUniverse: () => void, onTextureHoverPosition: OnTextureHoverPosition, fieldSize: number): void {
  if (!onTextureHoverPosition) {
    return
  }
  const { row, col } = getRowColFromTextureHoverPosition(onTextureHoverPosition, fieldSize);

  universe.toggle_cell(row, col);

  updateUniverse();
}
