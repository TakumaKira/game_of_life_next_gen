import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import { pause, play } from "@/game-of-life-next-gen/anim-controller";
import type { AnimationState } from "@/game-of-life-next-gen/anim-controller";

export default function togglePlayPauseImpl(fps: FPS, universe: Universe, updateUniverse: () => void, animationState: AnimationState, speed: number): void {
  if (animationState.isPlaying === false) {
    play(fps, universe, updateUniverse, animationState, speed);
  } else {
    pause(animationState);
  }
}
