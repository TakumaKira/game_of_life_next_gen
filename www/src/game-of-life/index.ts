import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import onDestory from "@/game-of-life/onDestory";
import setupImpl from "@/game-of-life/setupImpl";

export default async function setup(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void, autoStart = true): Promise<{ play: () => void, pause: () => void, nextFrame: () => void, destroy: () => void }> {
  const wasmModule = await buildWasmModule({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const destroyedState = { isDestroyed: false }
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onTogglePlayPause, getIsPlaying, onNextFrame, onClickCanvasFnRef, dispose } = setupImpl(canvas, updatePlayingState, updateFpsData, wasmModule.memory, getCurrentAnimId, updateAnimId)
  const play = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    if (getIsPlaying()) {
      return
    }
    onTogglePlayPause()
  }
  const pause = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    if (!getIsPlaying()) {
      return
    }
    onTogglePlayPause()
  }
  const nextFrame = () => {
    if (destroyedState.isDestroyed) {
      return
    }
    onNextFrame()
  }
  const destroy = () => {
    updatePlayingState(false)
    destroyedState.isDestroyed = onDestory(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose).isDestroyed
  }
  if (autoStart) {
    play()
  }
  return { play, pause, nextFrame, destroy }
}
