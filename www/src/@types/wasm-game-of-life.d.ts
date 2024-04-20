type BGModule = {}
type WASMModule = { memory: WebAssembly.Memory }

declare module 'wasm-game-of-life/wasm_game_of_life_bg.wasm' {
  export default function wasm(importObject: { './wasm_game_of_life_bg.js': BGModule }): Promise<WASMModule>
}

declare module 'wasm-game-of-life/wasm_game_of_life_bg.js' {
  import { Universe, CellState } from "wasm-game-of-life"

  function __wbg_set_wasm(wasm: WASMModule): void

  export {
    __wbg_set_wasm,
    Universe,
    CellState,
  }
}
