import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function onClickNextFrameButton(universe: Universe, updateUniverse: () => void) {
  universe.tick(true);
  updateUniverse();
}
