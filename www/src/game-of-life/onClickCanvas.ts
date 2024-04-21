import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import drawCells from "./drawCells";

export default function onClickCanvas(event: MouseEvent, universe: Universe, memory: WebAssembly.Memory, width: number, height: number): void {
  console.warn('TODO: Modify to affect cells in 3D space')
  return

  // console.log('onClickCanvas')
  // const boundingRect = canvas.getBoundingClientRect();

  // const scaleX = canvas.width / boundingRect.width;
  // const scaleY = canvas.height / boundingRect.height;

  // const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  // const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  // const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  // const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  // universe.toggle_cell(row, col);

  // drawCells(universe, memory, canvas, width, height);
}
