import { Color4 } from "babylonjs";
import type { TextureValues } from "./drawer";

const TEXTURE_SIZE = 20;
/** In `px` */
const TEXTURE_RESOLUTION = 512;
const FIELD_SIZE = 128; // TODO: Add controller UI
const CELL_SIZE = TEXTURE_RESOLUTION / FIELD_SIZE - 1;
const GRID_COLOR = new Color4(0.05, 0.05, 0.05, 1);
const DEAD_COLOR = new Color4(0.1, 0.1, 0.1, 1);
const ALIVE_COLOR_BASE_1 = new Color4(1, 0, 0, 1);
const ALIVE_COLOR_BASE_2 = new Color4(1, 1, 0, 1);
const ALIVE_COLOR_BASE_3 = new Color4(0, 0, 1, 1);
const ALIVE_COLORS: TextureValues['aliveColors'] = [ALIVE_COLOR_BASE_1, ALIVE_COLOR_BASE_2, ALIVE_COLOR_BASE_3];
const TEXTURE_DEFAULTS: TextureValues = {
  gridColor: GRID_COLOR,
  deadColor: DEAD_COLOR,
  aliveColors: ALIVE_COLORS,
}
const LIFE_SPAN = 200; // TODO: Add controller UI

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
  TEXTURE_DEFAULTS,
  LIFE_SPAN,

  SCENE_BACKGROUND_COLOR_DEFAULT,

  EFFCT_DEFAULTS,
}
