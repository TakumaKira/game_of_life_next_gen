import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN } from "@/game-of-life-next-gen/constants";

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(fieldSize = DEFAULT_FIELD_SIZE, lifeSpan = DEFAULT_LIFE_SPAN): { universe: Universe, width: number, height: number, lifeSpan: number } {
  const universe = Universe.new(fieldSize, lifeSpan);
  const returnWidth = universe.width();
  const returnHeight = universe.height();
  const returnLifeSpan = universe.get_life_span();
  return { universe, width: returnWidth, height: returnHeight, lifeSpan: returnLifeSpan }
}
