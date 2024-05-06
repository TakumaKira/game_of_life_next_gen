import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import { pause, play } from "@/game-of-life-next-gen/anim-controller";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import type { AnimationState } from "@/game-of-life-next-gen/anim-controller";

export default function onClickPlayPauseButton(fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, animationState: AnimationState): void {
  if (animationState.isPlaying === false) {
    play(fps, universe, memory, updateTextureContext, width, height, lifeSpan, animationState);
  } else {
    pause(animationState);
  }
}
