<div align="center">

  <h1><code>game_of_life_next_gen</code></h1>

  <strong>Conway's Game of Life with Cutting-Edge Tech Stacks</strong>

  <img src="screen_shot_2024-06-14.png" alt="Screen Shot" width="600" />

  <sub>Originally built by <a href="https://rustwasm.github.io/">The Rust and WebAssembly Working Group</a></sub>

  <sub>Original repository: <a href="https://github.com/rustwasm/wasm_game_of_life">rustwasm/wasm_game_of_life</a></sub>

</div>

## About

This repository is an extended version of [rustwasm/wasm_game_of_life](https://github.com/rustwasm/wasm_game_of_life) repository.

## Features

- 🚀 Using WASM with Rust for processing the simulation
- 🌈 Each cell has the limited “age” and it is visible by colors
- 💻 Using WebGL for the beautiful animation
- ⚙️ Fully configurable game settings and visual configurations
- 🧪 Enable performance comparison with JavaScript based computation

## What are achieved in this repository?

- Expand `wasm_game_of_life` module to achieve new functionalities
- Refine UI/UX with many tech stacks (See more in [WWW/README](www/README.md))

## How to use

### Prerequisites

You need to install [wasm-pack](https://rustwasm.github.io/wasm-pack/) to build this module.

### Build module

- Run `wasm-pack build`

## Lesson learned

"Using WASM with Rust" sounds really fancy, but we need to really be careful what it really means, especially when it comes to selecting tech stacks to real-world products. If we added WASM with Rust without any serious consideration, it only results in adding extra complexity without benefits. In this project, at least in current setting, using WASM with Rust seems to make no big user-noticable difference. But this project is still meaningful to me because at least it told me the reality and I may somehow find something interesting in the future as this provide easy A/B tests in some sort.

At least, I noticed that WASM is faster than JavaScript version at speed is 100 or 1,000.
