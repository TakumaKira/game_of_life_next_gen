import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { FIELD_SIZE, LIFE_SPAN } from "@/game-of-life/constants";

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(): { universe: Universe, width: number, height: number, lifeSpan: number } {
  const universe = Universe.new(FIELD_SIZE, LIFE_SPAN);
  const width = universe.width();
  const height = universe.height();
  const lifeSpan = universe.get_life_span();
  return { universe, width, height, lifeSpan }
}
