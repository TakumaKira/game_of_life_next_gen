import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import FPS from "./FPS";
import { isPaused, pause, play } from "./animController";

export default function onClickPlayPauseButton(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number, getCurrentAnimationId: () => null | number, updateAnimId: (id: number | null) => void): void {
  console.log('onClickPlayPauseButton')
  const animationId = getCurrentAnimationId()
  if (isPaused(animationId)) {
    play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);
  } else {
    pause(playPauseButton, getCurrentAnimationId, updateAnimId);
  }
}
