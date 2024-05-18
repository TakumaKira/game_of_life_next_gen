import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function nextFrameImpl(universe: Universe, updateUniverse: () => void, showLog = false) {
  universe.tick(showLog);
  updateUniverse();
}
