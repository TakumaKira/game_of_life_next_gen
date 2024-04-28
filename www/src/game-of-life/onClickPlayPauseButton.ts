import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import FPS from "./FPS";
import { isPaused, pause, play } from "./animController";
import type { TextContextUpdateFn } from "./setupBabylon";

export default function onClickPlayPauseButton(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): void {
  console.log('onClickPlayPauseButton')
  if (isPaused(getCurrentAnimId)) {
    play(playPauseButton, fps, universe, memory, updateTextureContext, width, height, updateAnimId);
  } else {
    pause(playPauseButton, getCurrentAnimId, updateAnimId);
  }
}
