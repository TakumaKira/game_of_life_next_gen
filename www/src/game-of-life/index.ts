import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import { play } from "./animController";
import FPS from "./FPS";
import setCanvasDimensions from "./setCanvasDimensions";
import getContext from "./getContext";
import getUniverse from "./getUniverse";
import onClickPlayPauseButton from "./onClickPlayPauseButton";
import onClickNextFrameButton from "./onClickNextFrameButton";
import onClickCanvas from "./onClickCanvas";
import setupBabylon from "./setupBabylon";

export default async function run(canvas: HTMLCanvasElement, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement): Promise<{ destroy: () => void }> {
  const wasmModule = await wasm({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef } = main(canvas, wasmModule.memory, playPauseButton, nextFrameButton, fpsElement, getCurrentAnimId, updateAnimId)
  return { destroy: () => destroyImpl(onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef, playPauseButton, nextFrameButton, canvas, getCurrentAnimId) }
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void } {
  const { universe, width, height } = getUniverse();
  console.log(width, height)

  // setCanvasDimensions(canvas, width, height);
  canvas.height = window.innerHeight - 200
  canvas.width = window.innerWidth

  let hoverPos: { x: number, z: number } | null = null
  const onHoverTextureContext = (point: { x: number, z: number } | null) => {
    hoverPos = point
  }

  const updateTextureContext = setupBabylon(canvas, onHoverTextureContext);

  const fps = new FPS(fpsElement);

  // const context = getContext(canvas);

  const onClickPlayPauseButtonFnRef = () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, updateTextureContext, width, height, getCurrentAnimId, updateAnimId)
  playPauseButton.addEventListener("click", onClickPlayPauseButtonFnRef);

  const onClickNextFrameButtonFnRef = () => onClickNextFrameButton(universe, memory, updateTextureContext, width, height)
  nextFrameButton.addEventListener("click", onClickNextFrameButtonFnRef);

  const onClickCanvasFnRef = (event: MouseEvent) => onClickCanvas(event, canvas, universe, memory, updateTextureContext, width, height, hoverPos)
  canvas.addEventListener("click", onClickCanvasFnRef);

  play(playPauseButton, fps, universe, memory, updateTextureContext, width, height, updateAnimId);

  return { onClickPlayPauseButtonFnRef: () => {}, onClickNextFrameButtonFnRef: () => {}, onClickCanvasFnRef: () => {} }
}

function destroyImpl(onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, canvas: HTMLCanvasElement, getCurrentAnimId: () => number | null) {
  playPauseButton.removeEventListener("click", onClickPlayPauseButtonFnRef)
  nextFrameButton.removeEventListener("click", onClickNextFrameButtonFnRef)
  canvas.removeEventListener("click", onClickCanvasFnRef)
  const animationId = getCurrentAnimId()
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}
