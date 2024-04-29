import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import { play } from "./animController";
import FPS from "./FPS";
import getUniverse from "./getUniverse";
import onClickPlayPauseButton from "./onClickPlayPauseButton";
import onClickNextFrameButton from "./onClickNextFrameButton";
import onClickCanvas from "./onClickCanvas";
import setupBabylon from "./setupBabylon";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "./setupBabylon";

export default async function run(canvas: HTMLCanvasElement, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement): Promise<{ destroy: () => void }> {
  const wasmModule = await buildWasmModule({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef } = main(canvas, wasmModule.memory, playPauseButton, nextFrameButton, fpsElement, getCurrentAnimId, updateAnimId)
  return { destroy: () => destroyImpl(onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef, playPauseButton, nextFrameButton, canvas, getCurrentAnimId) }
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: () => void } {
  const { universe, width, height } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const updateTextureContext = setupBabylon(canvas, onHoverTextureContext);

  const fps = new FPS(fpsElement);

  const onClickPlayPauseButtonFnRef = () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, updateTextureContext, width, height, getCurrentAnimId, updateAnimId)
  playPauseButton.addEventListener("click", onClickPlayPauseButtonFnRef);

  const onClickNextFrameButtonFnRef = () => onClickNextFrameButton(universe, memory, updateTextureContext, width, height)
  nextFrameButton.addEventListener("click", onClickNextFrameButtonFnRef);

  const onClickCanvasFnRef = () => onClickCanvas(universe, memory, updateTextureContext, width, height, onTextureHoverPosition)
  canvas.addEventListener("click", onClickCanvasFnRef);

  play(playPauseButton, fps, universe, memory, updateTextureContext, width, height, updateAnimId);

  return { onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef }
}

function destroyImpl(onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: () => void, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, canvas: HTMLCanvasElement, getCurrentAnimId: () => number | null) {
  playPauseButton.removeEventListener("click", onClickPlayPauseButtonFnRef)
  nextFrameButton.removeEventListener("click", onClickNextFrameButtonFnRef)
  canvas.removeEventListener("click", onClickCanvasFnRef)
  const animationId = getCurrentAnimId()
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}
