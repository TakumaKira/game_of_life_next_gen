declare module 'wasm-game-of-life/wasm_game_of_life_bg.wasm' {
  export default function wasm(importObject: { './wasm_game_of_life_bg.js': any }): Promise<any>
}