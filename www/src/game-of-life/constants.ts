/** In `px` */
const TEXTURE_RESOLUTION = 512;
const FIELD_SIZE = 128;
const CELL_SIZE = TEXTURE_RESOLUTION / FIELD_SIZE - 1;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR_BASE_1 = "#FF0000";
const ALIVE_COLOR_BASE_2 = "#FFFF00";
const ALIVE_COLOR_BASE_3 = "#0000FF";
const ALIVE_COLORS = [ALIVE_COLOR_BASE_1, ALIVE_COLOR_BASE_2, ALIVE_COLOR_BASE_3];
const LIFE_SPAN = 200;

export {
  TEXTURE_RESOLUTION,
  FIELD_SIZE,
  CELL_SIZE,
  GRID_COLOR,
  DEAD_COLOR,
  ALIVE_COLORS,
  LIFE_SPAN,
}
