//! Test suite for the Web and headless browsers.
// These tests will run with the following command: `wasm-pack test --firefox --headless`

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

extern crate wasm_game_of_life;
use wasm_game_of_life::*;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 2);
}

#[cfg(test)]
pub fn input_spaceship() -> Universe {
    let mut universe = Universe::new(6, 2, Vec::<u32>::new());
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(1,2), (2,3), (3,1), (3,2), (3,3)]);
    universe
}
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Dead    Alive-0 Dead    Dead    Dead
// Dead    Dead    Dead    Alive-0 Dead    Dead
// Dead    Alive-0 Alive-0 Alive-0 Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead

#[cfg(test)]
pub fn expected_spaceship_after_first_tick() -> Universe {
    let mut universe = Universe::new(6, 2, Vec::<u32>::new());
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(2,1), (2,3), (3,2), (3,3), (4,2)]);
    universe
}
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Alive-0 Dead    Alive-1 Dead    Dead
// Dead    Dead    Alive-1 Alive-1 Dead    Dead
// Dead    Dead    Alive-0 Dead    Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead

#[cfg(test)]
pub fn expected_spaceship_after_second_tick() -> Universe {
    let mut universe = Universe::new(6, 2, Vec::<u32>::new());
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(3,1), (4,2), (4,3)]);
    universe
}
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead
// Dead    Alive-0 Dead    Dead    Dead    Dead
// Dead    Dead    Alive-1 Alive-0 Dead    Dead
// Dead    Dead    Dead    Dead    Dead    Dead

#[wasm_bindgen_test]
pub fn test_tick() {
    // Let's create a smaller Universe with a small spaceship to test!
    let mut input_universe = input_spaceship();

    // This is what our spaceship should look like
    // after one tick in our universe.
    let expected_universe_after_first_tick = expected_spaceship_after_first_tick();
    
    //// Call `tick` and then see if the cells in the `Universe`s are the same.
    input_universe.tick(false);
    assert_eq!(&input_universe.get_cells().iter().map(|cell| cell.get_state(input_universe.get_lifespan())).collect::<Vec<CellState>>(), &expected_universe_after_first_tick.get_cells().iter().map(|cell| cell.get_state(expected_universe_after_first_tick.get_lifespan())).collect::<Vec<CellState>>());

    let expected_universe_after_second_tick = expected_spaceship_after_second_tick();

    input_universe.tick(false);
    assert_eq!(&input_universe.get_cells().iter().map(|cell| cell.get_state(input_universe.get_lifespan())).collect::<Vec<CellState>>(), &expected_universe_after_second_tick.get_cells().iter().map(|cell| cell.get_state(expected_universe_after_second_tick.get_lifespan())).collect::<Vec<CellState>>());
}
