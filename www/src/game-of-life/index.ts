/// <reference types="./index.d.ts" />
import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

import drawGrid from './drawGrid';
import drawCells from "./drawCells";
import { isPaused, pause, play } from "./animController";
import FPS from "./FPS";
import { CELL_SIZE } from "./constants";

export default function run(canvas: HTMLCanvasElement, playPauseButtonId: string, fpsElementId: string): void {
  wasm({'./wasm_game_of_life_bg.js': bg}).then(wasm => {
    bg.__wbg_set_wasm(wasm)
    main(canvas, wasm.memory, playPauseButtonId, fpsElementId)
  })
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, playPauseButtonId: string, fpsElementId: string) {
  const { universe, width, height } = getUniverse();

  setCanvasDimensions(canvas, width, height);

  const { context, playPauseButton, fpsElement } = getElements(canvas, playPauseButtonId, fpsElementId);

  const fps = new FPS(fpsElement);

  let animationId: null | number = null;
  const updateAnimId = (id: number | null) => animationId = id;
  playPauseButton.addEventListener("click", () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, context, width, height, animationId, updateAnimId));
  canvas.addEventListener("click", event => onClickCanvas(event, canvas, universe, memory, context, width, height));

  play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);
}

/**
 * Construct the universe, and get its width and height.
 */
function getUniverse(): { universe: Universe, width: number, height: number } {
  const universe = bg.Universe.new();
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
  const context = canvas.getContext('2d');
  if (context === null) {
    throw new Error("canvas 2d context not found")
  }

  const playPauseButton = document.getElementById(playPauseButtonId);
  if (playPauseButton === null || !(playPauseButton instanceof HTMLButtonElement)) {
    throw new Error("button element with id play-pause not found")
  }

  const fpsElement = document.getElementById(fpsElementId)
  if (fpsElement === null || !(fpsElement instanceof HTMLDivElement)) {
    throw new Error("div element with id fps not found")
  }

  return { context, playPauseButton, fpsElement }
}

function onClickPlayPauseButton(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number, animationId: null | number, updateAnimId: (id: number | null) => void): void {
  if (isPaused(animationId)) {
    play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);
  } else {
    pause(playPauseButton, animationId, updateAnimId);
  }
}

function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number): void {
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
