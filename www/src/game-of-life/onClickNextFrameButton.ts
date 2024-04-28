import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';
import type { TextContextUpdateFn } from "./setupBabylon";

export default function onClickNextFrameButton(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number) {
  universe.tick(true);
  drawGrid(updateTextureContext, width, height);
  drawCells(universe, memory, updateTextureContext, width, height);
}
