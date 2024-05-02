import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import { play } from "@/game-of-life/animController";
import FPS from "@/game-of-life/FPS";
import getUniverse from "@/game-of-life/getUniverse";
import onClickPlayPauseButton from "@/game-of-life/onClickPlayPauseButton";
import onClickNextFrameButton from "@/game-of-life/onClickNextFrameButton";
import onClickCanvas from "@/game-of-life/onClickCanvas";
import setupBabylon from "@/game-of-life/setupBabylon";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life/setupBabylon";

export default async function run(canvas: HTMLCanvasElement, onTogglePlayingState: (isPlaying: boolean) => void, updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void): Promise<{ play: () => void, pause: () => void, nextFrame: () => void, destroy: () => void }> {
  const wasmModule = await buildWasmModule({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const destroyedState = { isDestroyed: false }
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onClickPlayPauseButtonFnRef, getIsPlaying, onClickNextFrameButtonFnRef, onClickCanvasFnRef, dispose } = main(canvas, onTogglePlayingState, updateFpsData, wasmModule.memory, getCurrentAnimId, updateAnimId)
  const play = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    if (getIsPlaying()) {
      return
    }
    onClickPlayPauseButtonFnRef()
  }
  const pause = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    if (!getIsPlaying()) {
      return
    }
    onClickPlayPauseButtonFnRef()
  }
  const nextFrame = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    onClickNextFrameButtonFnRef()
  }
  const destroy = () => {
    onTogglePlayingState(false)
    destroyedState.isDestroyed = destroyImpl(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose).isDestroyed
  }
  return { play, pause, nextFrame, destroy }
}

function main(canvas: HTMLCanvasElement, onTogglePlayingState: (isPlaying: boolean) => void, updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void, memory: WebAssembly.Memory, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onClickPlayPauseButtonFnRef: () => void, getIsPlaying: () => boolean, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: () => void, dispose: () => void } {
  const { universe, width, height, lifeSpan } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, dispose } = setupBabylon(canvas, onHoverTextureContext);

  const fps = new FPS(updateFpsData);

  const playingState = { isPlaying: false };

  const onClickPlayPauseButtonFnRef = () => {
    const result = onClickPlayPauseButton(fps, universe, memory, updateTextureContext, width, height, lifeSpan, getCurrentAnimId, updateAnimId)
    playingState.isPlaying = result.isPlaying
    onTogglePlayingState(playingState.isPlaying)
  }

  const onClickNextFrameButtonFnRef = () => onClickNextFrameButton(universe, memory, updateTextureContext, width, height, lifeSpan)

  const onClickCanvasFnRef = () => onClickCanvas(universe, memory, updateTextureContext, width, height, lifeSpan, onTextureHoverPosition)
  canvas.addEventListener("click", onClickCanvasFnRef);

  const startToPlay = () => {
    const result = play(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
    playingState.isPlaying = result.isPlaying
    onTogglePlayingState(playingState.isPlaying)
  }

  const getIsPlaying = () => playingState.isPlaying

  startToPlay()

  return { onClickPlayPauseButtonFnRef, getIsPlaying, onClickNextFrameButtonFnRef, onClickCanvasFnRef, dispose }
}

function destroyImpl(onClickCanvasFnRef: () => void, canvas: HTMLCanvasElement, getCurrentAnimId: () => number | null, dispose: () => void): { isDestroyed: boolean } {
  canvas.removeEventListener("click", onClickCanvasFnRef)
  const animationId = getCurrentAnimId()
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  dispose()
  return { isDestroyed: true }
}
