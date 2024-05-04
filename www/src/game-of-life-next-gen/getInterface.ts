import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import onDestroy from "./onDestroy";
import setup from "./setup";
import type { UpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";

export default async function getInterface(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: UpdateFpsDataFn, autoStart = true): Promise<{ play: () => void, pause: () => void, nextFrame: () => void, destroy: () => void }> {
  const wasmModule = await buildWasmModule({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const destroyedState = { isDestroyed: false }
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onTogglePlayPause, getIsPlaying, onNextFrame, onClickCanvasFnRef, dispose } = setup(canvas, updatePlayingState, updateFpsData, wasmModule.memory, getCurrentAnimId, updateAnimId)
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
    if (getIsPlaying()) {
      pause()
    }
    onNextFrame()
  }
  const destroy = () => {
    updatePlayingState(false)
    destroyedState.isDestroyed = onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose).isDestroyed
  }
  if (autoStart) {
    play()
  }
  return { play, pause, nextFrame, destroy }
}
