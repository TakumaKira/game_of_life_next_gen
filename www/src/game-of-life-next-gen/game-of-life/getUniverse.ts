import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { UniverseJS } from "./UniverseJS";

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(fieldSize: number, lifespan: number, aliveCellBase: number[], useJSVersion: boolean = false): { universe: Universe, width: number, height: number, lifespan: number } {
  const universe = useJSVersion ? UniverseJS.new(fieldSize, lifespan, aliveCellBase) as Universe : Universe.new(fieldSize, lifespan, new Uint32Array(aliveCellBase));
  const returnWidth = universe.width();
  const returnHeight = universe.height();
  const returnLifespan = universe.get_lifespan();
  return { universe, width: returnWidth, height: returnHeight, lifespan: returnLifespan }
}
