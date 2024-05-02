import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';
import drawCells from "@/game-of-life/drawCells";
import drawGrid from "@/game-of-life/drawGrid";
import type { TextContextUpdateFn } from "@/game-of-life/setupBabylon";

export default function onClickNextFrameButton(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number) {
  universe.tick(true);
  drawGrid(updateTextureContext, width, height);
  drawCells(universe, memory, updateTextureContext, width, height, lifeSpan);
}
