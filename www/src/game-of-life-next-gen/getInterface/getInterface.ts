import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import onDestroy from "../onDestroy";
import setup from "../setup";
import type { UpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import type { DestroyedState } from "./types";
import playImpl from "./playImpl";
import pauseImpl from "./pauseImpl";
import nextFrameImpl from "./nextFrameImpl";
import destroyImpl from "./destroyImpl";

export default async function getInterface(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: UpdateFpsDataFn, autoStart = true): Promise<{ play: () => void, pause: () => void, nextFrame: () => void, destroy: () => void }> {
  const wasmModule = await buildWasmModule({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const destroyedState: DestroyedState = { isDestroyed: false }
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId
  const { onTogglePlayPause, getIsPlaying, onNextFrame, onClickCanvasFnRef, dispose } = setup(canvas, updatePlayingState, updateFpsData, wasmModule.memory, getCurrentAnimId, updateAnimId)
  const play = () => playImpl(onTogglePlayPause, getIsPlaying, destroyedState)
  const pause = () => pauseImpl(onTogglePlayPause, getIsPlaying, destroyedState)
  const nextFrame = () => nextFrameImpl(onNextFrame, pause, getIsPlaying, destroyedState)
  const destroy = () => destroyImpl(() => onDestroy(onClickCanvasFnRef, canvas, getCurrentAnimId, dispose), updatePlayingState, destroyedState)
  if (autoStart) {
    play()
  }
  return { play, pause, nextFrame, destroy }
}
