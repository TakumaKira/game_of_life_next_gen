extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use std::fmt;
use wasm_bindgen::prelude::*;
use web_sys::console;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        console::time_with_label(name);
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        console::time_end_with_label(self.name);
    }
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CellState {
    Dead = 0,
    Alive = 1,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    age: u8,
    is_killed: bool,
    life_span: u8,
}

impl Cell {
    pub fn new(life_span: u8) -> Cell {
        Cell { age: 0, is_killed: false, life_span }
    }

    pub fn increment_age(&mut self) {
        if self.age < self.life_span {
            self.age += 1;
        }
    }

    pub fn kill(&mut self) {
        self.is_killed = true
    }

    pub fn get_state(&self) -> CellState {
        if self.age < self.life_span && self.is_killed == false {
            CellState::Alive
        } else {
            CellState::Dead
        }
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    life_span: u8,
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::new(self.life_span);
        }
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 {
            self.height - 1
        } else {
            row - 1
        };

        let south = if row == self.height - 1 {
            0
        } else {
            row + 1
        };

        let west = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };

        let east = if column == self.width - 1 {
            0
        } else {
            column + 1
        };

        let nw = self.get_index(north, west);
        count += self.cells[nw].get_state() as u8;

        let n = self.get_index(north, column);
        count += self.cells[n].get_state() as u8;

        let ne = self.get_index(north, east);
        count += self.cells[ne].get_state() as u8;

        let w = self.get_index(row, west);
        count += self.cells[w].get_state() as u8;

        let e = self.get_index(row, east);
        count += self.cells[e].get_state() as u8;

        let sw = self.get_index(south, west);
        count += self.cells[sw].get_state() as u8;

        let s = self.get_index(south, column);
        count += self.cells[s].get_state() as u8;

        let se = self.get_index(south, east);
        count += self.cells[se].get_state() as u8;

        count
    }
}

/// Public methods, exported to JavaScript.
#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self, show_log: bool) {
        // let _timer = Timer::new("Universe::tick");

        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let mut cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                if show_log {
                    log!(
                        "cell[{}, {}] is initially {:?} and has {} live neighbors",
                        row,
                        col,
                        cell,
                        live_neighbors
                    );
                }

                let next_cell = match (cell.get_state(), live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbours
                    // dies, as if caused by underpopulation.
                    (CellState::Alive, x) if x < 2 => {
                        cell.kill();
                        cell
                    },
                    // Rule 2: Any live cell with two or three live neighbours
                    // lives on to the next generation.
                    (CellState::Alive, 2) | (CellState::Alive, 3) => {
                        cell.increment_age();
                        cell
                    },
                    // Rule 3: Any live cell with more than three live
                    // neighbours dies, as if by overpopulation.
                    (CellState::Alive, x) if x > 3 => {
                        cell.kill();
                        cell
                    },
                    // Rule 4: Any dead cell with exactly three live neighbours
                    // becomes a live cell, as if by reproduction.
                    (CellState::Dead, 3) => Cell::new(self.life_span),
                    // All other cells remain in the same state.
                    (_, _) => cell,
                };

                if show_log {
                    log!("    it becomes {:?}", next_cell);
                }

                next[idx] = next_cell;
            }
        }

        self.cells = next;
    }

    pub fn new(size: u32, life_span: u8) -> Universe {
        utils::set_panic_hook();

        let size = if size == 0 { 128 } else { size };
        let life_span = if life_span == 0 { 100 } else { life_span };
        let width = size;
        let height = size;

        let cells = (0..width * height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::new(life_span)
                } else {
                    let mut cell = Cell::new(life_span);
                    cell.kill();
                    cell
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
            life_span,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_i| {
            let mut cell = Cell::new(self.life_span);
            cell.kill();
            cell
        }).collect();
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_i| {
            let mut cell = Cell::new(self.life_span);
            cell.kill();
            cell
        }).collect();
    }

    pub fn cells_state(&self) -> *const CellState {
        let states = self.cells.iter().map(|cell| cell.get_state()).collect::<Vec<CellState>>();
        // Convert the vector into a boxed slice, allocating memory on the heap, making the pointer distinct from what cells_age returns
        let boxed_states = states.into_boxed_slice();
        // Convert the boxed slice into a raw pointer
        let ptr = Box::into_raw(boxed_states) as *const CellState;
        ptr
    }

    pub fn cells_age(&self) -> *const u8 {
        let ages = self.cells.iter().map(|cell| cell.age).collect::<Vec<u8>>();
        // Convert the vector into a boxed slice, allocating memory on the heap, making the pointer distinct from what cells_state returns
        let boxed_ages = ages.into_boxed_slice();
        // Convert the boxed slice into a raw pointer
        let ptr = Box::into_raw(boxed_ages) as *const u8;
        ptr
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        if self.cells[idx].get_state() == CellState::Alive {
            self.cells[idx].increment_age()
        } else {
            self.cells[idx] = Cell::new(self.life_span);
        }
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell.get_state() == CellState::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}
