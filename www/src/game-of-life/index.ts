/// <reference types="./index.d.ts" />
import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

import drawGrid from './drawGrid';
import drawCells from "./drawCells";
import { isPaused, pause, play } from "./animController";
import FPS from "./FPS";
import { CELL_SIZE } from "./constants";

export default async function run(canvas: HTMLCanvasElement, playPauseButton: HTMLButtonElement, fpsElement: HTMLDivElement): Promise<{ destroy: () => void }> {
  const wasmModule = await wasm({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  const context = getCanvas(canvas);
  const { onClickPlayPauseButtonFnRef, onClickCanvasFnRef } = main(canvas, wasmModule.memory, context, playPauseButton, fpsElement)
  return { destroy: () => destroyImpl(onClickPlayPauseButtonFnRef, onClickCanvasFnRef, playPauseButton, canvas) }
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, playPauseButton: HTMLButtonElement, fpsElement: HTMLDivElement): { onClickPlayPauseButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void } {
  const { universe, width, height } = getUniverse();

  setCanvasDimensions(canvas, width, height);

  const fps = new FPS(fpsElement);

  let animationId: null | number = null;
  const updateAnimId = (id: number | null) => animationId = id;

  const onClickPlayPauseButtonFnRef = () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, context, width, height, animationId, updateAnimId)
  playPauseButton.addEventListener("click", onClickPlayPauseButtonFnRef);

  const onClickCanvasFnRef = (event: MouseEvent) => onClickCanvas(event, canvas, universe, memory, context, width, height)
  canvas.addEventListener("click", onClickCanvasFnRef);

  play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);

  return { onClickPlayPauseButtonFnRef, onClickCanvasFnRef }
}

function destroyImpl(onClickPlayPauseButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void, playPauseButton: HTMLButtonElement, canvas: HTMLCanvasElement) {
  playPauseButton.removeEventListener("click", onClickPlayPauseButtonFnRef)
  canvas.removeEventListener("click", onClickCanvasFnRef)
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

function getCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');
  if (context === null) {
    throw new Error("canvas 2d context not found")
  }
  return context
}

function onClickPlayPauseButton(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number, animationId: null | number, updateAnimId: (id: number | null) => void): void {
  console.log('onClickPlayPauseButton')
  if (isPaused(animationId)) {
    play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);
  } else {
    pause(playPauseButton, animationId, updateAnimId);
  }
}

function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number): void {
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
