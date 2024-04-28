import { ICanvasRenderingContext } from "babylonjs";
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function onClickNextFrameButton(universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: (textureContext: ICanvasRenderingContext) => void) => void, width: number, height: number) {
  console.log('onClickNextFrameButton')
  universe.tick(true);
  drawGrid(updateTextureContext, width, height);
  drawCells(universe, memory, updateTextureContext, width, height);
}
