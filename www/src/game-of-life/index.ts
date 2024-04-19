/// <reference types="./index.d.ts" />
import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import drawGrid from './drawGrid';
import drawCells from "./drawCells";
import { isPaused, pause, play } from "./animController";
import FPS from "./FPS";
import { CELL_SIZE } from "./constants";

export default function run(canvas: HTMLCanvasElement, playPauseButtonId: string, fpsElementId: string): void {
  wasm({'./wasm_game_of_life_bg.js': bg}).then(wasm => {
    bg.__wbg_set_wasm(wasm)
    main(bg.Universe, bg.Cell, wasm.memory, canvas, playPauseButtonId, fpsElementId)
  })
}

function main(Universe: typeof bg.Universe, Cell: typeof bg.Cell, memory: WebAssembly.Memory, canvas: HTMLCanvasElement, playPauseButtonId: string, fpsElementId: string) {
  const { universe, width, height } = getUniverse(Universe);

  setCanvasDimensions(canvas, width, height);

  const { ctx, fpsElement, playPauseButton } = getElements(canvas, playPauseButtonId, fpsElementId);

  const fps = new FPS(fpsElement);

  let animationId: null | number = null;
  playPauseButton.addEventListener("click", event => animationId = onClickPlayPauseButton(event, playPauseButton, fps, ctx, Cell, universe, memory, width, height, animationId));
  canvas.addEventListener("click", event => onClickCanvas(event, canvas, width, height, ctx, Cell, universe, memory));

  play(playPauseButton, fps, ctx, Cell, universe, memory, width, height);
}

/**
 * Construct the universe, and get its width and height.
 */
function getUniverse(Universe: typeof bg.Universe): { universe: bg.Universe, width: number, height: number } {
  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();
  return { universe, width, height }
}

/**
 * Give the canvas room for all of our cells and a 1px border
 * around each of them.
 */
function setCanvasDimensions(canvas: HTMLCanvasElement, width: number, height: number): void {
  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;
}

function getElements(canvas: HTMLCanvasElement, playPauseButtonId: string, fpsElementId: string) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error("canvas 2d context not found")
  }

  const fpsElement = document.getElementById(fpsElementId)
  if (fpsElement === null || !(fpsElement instanceof HTMLDivElement)) {
    throw new Error("div element with id fps not found")
  }

  const playPauseButton = document.getElementById(playPauseButtonId);
  if (playPauseButton === null || !(playPauseButton instanceof HTMLButtonElement)) {
    throw new Error("button element with id play-pause not found")
  }

  return { ctx, fpsElement, playPauseButton }
}

function onClickPlayPauseButton(event: MouseEvent, playPauseButton: HTMLButtonElement, fps: FPS, context: CanvasRenderingContext2D, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number, animationId: null | number): number | null {
  if (isPaused(animationId)) {
    return play(playPauseButton, fps, context, Cell, universe, memory, width, height);
  } else {
    return pause(playPauseButton, animationId);
  }
}

function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement, width: number, height: number, context: CanvasRenderingContext2D, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory): void {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawCells(universe, memory, width, height, context, Cell);
  drawGrid(context, width, height);
}
