import { Color4 } from "babylonjs";

const TEXTURE_SIZE = 20;
/** In `px` */
const TEXTURE_RESOLUTION = 512;
const FIELD_SIZE = 128; // TODO: Add controller UI
const CELL_SIZE = TEXTURE_RESOLUTION / FIELD_SIZE - 1;
const GRID_COLOR = "#111"; // TODO: Add controller UI
const DEAD_COLOR = "#222"; // TODO: Add controller UI
const ALIVE_COLOR_BASE_1 = "#FF0000"; // TODO: Add controller UI
const ALIVE_COLOR_BASE_2 = "#FFFF00"; // TODO: Add controller UI
const ALIVE_COLOR_BASE_3 = "#0000FF"; // TODO: Add controller UI
const ALIVE_COLORS = [ALIVE_COLOR_BASE_1, ALIVE_COLOR_BASE_2, ALIVE_COLOR_BASE_3];
const LIFE_SPAN = 200; // TODO: Add controller UI

const SHOW_ON_SCREEN_CONTROLS = true; // TODO: Add controller UI

const SCENE_BACKGROUND_COLOR_DEFAULT = new Color4(0, 0, 0.1, 0);
const EFFCT_DEFAULTS = {
  BLOOM_ENABLED: true,
  BLOOM_WEIGHT: 2,
  FXAA_ENABLED: false,
  IMAGE_PROCESSING: {
    ENABLED: true,
    TONE_MAPPING_ENABLED: false,
    VIGNETTE_ENABLED: false,
    VIGNETTE_COLOR: new Color4(0, 0, 1, 0),
    VIGNETTE_WEIGHT: 10,
    COLOR_CURVES_ENABLED: false,
    CONTRAST: 1.2,
    EXPOSURE: 4,
  },
}

export {
  TEXTURE_SIZE,
  TEXTURE_RESOLUTION,
  FIELD_SIZE,
  CELL_SIZE,
  GRID_COLOR,
  DEAD_COLOR,
  ALIVE_COLORS,
  LIFE_SPAN,

  SCENE_BACKGROUND_COLOR_DEFAULT,

  SHOW_ON_SCREEN_CONTROLS,
  EFFCT_DEFAULTS,
}
