import drawCells from "./drawCells";
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function onClickNextFrameButton(universe: Universe, memory: WebAssembly.Memory, width: number, height: number) {
  console.log('onClickNextFrameButton')
  universe.tick(true);
  // drawCells(universe, memory, width, height);
}
