import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { CELL_SIZE } from "./constants";
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";

export default function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number): void {
  console.log('onClickCanvas')
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, context, width, height);
  drawGrid(context, width, height);
}
