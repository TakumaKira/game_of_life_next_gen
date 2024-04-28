import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { CELL_SIZE, FIELD_SIZE } from "./constants";
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import { ICanvasRenderingContext } from "babylonjs";

export default function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: (textureContext: ICanvasRenderingContext) => void) => void, width: number, height: number, hoverPos: { x: number, z: number } | null): void {
  console.log('onClickCanvas')
  if (!hoverPos) {
    return
  }

  // console.log(hoverPos)

  const row = Math.floor((20 - (hoverPos.z + 10)) / 20 * FIELD_SIZE);
  const col = Math.floor((hoverPos.x + 10) / 20 * FIELD_SIZE);

  console.log(row, col)

  // return

  // const boundingRect = canvas.getBoundingClientRect();

  // const scaleX = canvas.width / boundingRect.width;
  // const scaleY = canvas.height / boundingRect.height;

  // const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  // const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  // const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  // const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, updateTextureContext, width, height);
  drawGrid(updateTextureContext, width, height);
}
