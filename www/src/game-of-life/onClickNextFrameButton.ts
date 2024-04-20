import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function onClickNextFrameButton(universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number) {
  console.log('onClickNextFrameButton')
  universe.tick(true);
  drawGrid(context, width, height);
  drawCells(universe, memory, context, width, height);
}
