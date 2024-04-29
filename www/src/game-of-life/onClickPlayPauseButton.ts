import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import FPS from "./FPS";
import { isPaused, pause, play } from "./animController";
import type { TextContextUpdateFn } from "./setupBabylon";

export default function onClickPlayPauseButton(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): void {
  if (isPaused(getCurrentAnimId)) {
    play(playPauseButton, fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
  } else {
    pause(playPauseButton, getCurrentAnimId, updateAnimId);
  }
}
