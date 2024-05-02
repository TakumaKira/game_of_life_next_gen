import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import FPS from "@/game-of-life/FPS";
import { isPaused, pause, play } from "@/game-of-life/animController";
import type { TextContextUpdateFn } from "@/game-of-life/setupBabylon";

export default function onClickPlayPauseButton(fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { isPlaying: boolean } {
  if (isPaused(getCurrentAnimId)) {
    return play(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
  } else {
    return pause(getCurrentAnimId, updateAnimId);
  }
}
