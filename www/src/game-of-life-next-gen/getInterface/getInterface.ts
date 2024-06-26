import buildWasmModule from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import setup from "../setup";
import type { OnUpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import playImpl from "./playImpl";
import pauseImpl from "./pauseImpl";
import nextFrameImpl from "./nextFrameImpl";
import destroyImpl from "./destroyImpl";
import DestroyedState from "./DestroyedState";
import type { OnUpdatePlayingStateFn } from "../anim-controller";
import type { UniverseConfig } from "..";
import type { TextureColorsNullable } from "../drawer";
import type { GLValuesConfigurable } from "../gl-renderer";

const wasmModulePromise = buildWasmModule({'./wasm_game_of_life_bg.js': bg})

export default async function getInterface(canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, autoStart = true, universeConfig?: UniverseConfig): Promise<{ play: () => void, pause: () => void, nextFrame: (showLog?: boolean) => void, resetCamera: () => void, updateColors: (value: TextureColorsNullable) => void, updateEffects: (value: Partial<GLValuesConfigurable>) => void, destroy: () => void }> {
  const wasmModule = await wasmModulePromise
  bg.__wbg_set_wasm(wasmModule)
  const destroyedState = new DestroyedState();
  const { togglePlayPause: onTogglePlayPause, animationState, nextFrame: onNextFrame, onClickCanvasFnRef, resetCamera, updateColors: onUpdateColors, updateEffects: onUpdateEffects, destroy: destroySetup, draw } = setup(canvas, updatePlayingState, updateFpsData, wasmModule.memory, universeConfig)
  const play = () => playImpl(onTogglePlayPause, animationState, destroyedState)
  const pause = () => pauseImpl(onTogglePlayPause, animationState, destroyedState)
  const nextFrame = (showLog?: boolean) => nextFrameImpl(onNextFrame, animationState, destroyedState, showLog)
  const updateColors = (value: TextureColorsNullable) => onUpdateColors(value)
  const updateEffects = (value: Partial<GLValuesConfigurable>) => onUpdateEffects(value)
  const destroy = () => destroyImpl(onClickCanvasFnRef, canvas, animationState, destroySetup, destroyedState)
  if (autoStart) {
    play()
  } else {
    draw()
  }
  return { play, pause, nextFrame, resetCamera, updateColors, updateEffects, destroy }
}
