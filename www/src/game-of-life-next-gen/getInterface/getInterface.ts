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
  const destroyedStateRef: DestroyedState = { isDestroyed: false }
  const { onTogglePlayPause, animationState, onNextFrame, onClickCanvasFnRef, destroy: destroySetup } = setup(canvas, updatePlayingState, updateFpsData, wasmModule.memory)
  const play = () => playImpl(onTogglePlayPause, animationState, destroyedStateRef)
  const pause = () => pauseImpl(onTogglePlayPause, animationState, destroyedStateRef)
  const nextFrame = () => nextFrameImpl(onNextFrame, animationState, destroyedStateRef)
  const destroy = () => destroyImpl(() => onDestroy(onClickCanvasFnRef, canvas, animationState, destroySetup), destroyedStateRef)
  if (autoStart) {
    play()
  }
  return { play, pause, nextFrame, destroy }
}
