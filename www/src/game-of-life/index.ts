/// <reference types="./index.d.ts" />
import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import { play } from "./animController";
import FPS from "./FPS";
import setCanvasDimensions from "./setCanvasDimensions";
import getCanvas from "./getCanvas";
import getUniverse from "./getUniverse";
import onClickPlayPauseButton from "./onClickPlayPauseButton";
import onClickCanvas from "./onClickCanvas";

export default async function run(canvas: HTMLCanvasElement, playPauseButton: HTMLButtonElement, fpsElement: HTMLDivElement): Promise<{ destroy: () => void }> {
  const wasmModule = await wasm({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null;
  const updateAnimId = (id: number | null) => animationId = id;
  const { onClickPlayPauseButtonFnRef, onClickCanvasFnRef } = main(canvas, wasmModule.memory, playPauseButton, fpsElement, animationId, updateAnimId)
  return { destroy: () => destroyImpl(onClickPlayPauseButtonFnRef, onClickCanvasFnRef, playPauseButton, canvas, animationId) }
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, playPauseButton: HTMLButtonElement, fpsElement: HTMLDivElement, animationId: null | number, updateAnimId: (id: number | null) => void): { onClickPlayPauseButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void } {
  const { universe, width, height } = getUniverse();

  setCanvasDimensions(canvas, width, height);

  const fps = new FPS(fpsElement);

  const context = getCanvas(canvas);

  const onClickPlayPauseButtonFnRef = () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, context, width, height, animationId, updateAnimId)
  playPauseButton.addEventListener("click", onClickPlayPauseButtonFnRef);

  const onClickCanvasFnRef = (event: MouseEvent) => onClickCanvas(event, canvas, universe, memory, context, width, height)
  canvas.addEventListener("click", onClickCanvasFnRef);

  play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);

  return { onClickPlayPauseButtonFnRef, onClickCanvasFnRef }
}

function destroyImpl(onClickPlayPauseButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void, playPauseButton: HTMLButtonElement, canvas: HTMLCanvasElement, animationId: number | null) {
  playPauseButton.removeEventListener("click", onClickPlayPauseButtonFnRef)
  canvas.removeEventListener("click", onClickCanvasFnRef)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}
