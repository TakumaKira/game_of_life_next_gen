import { Color4, Vector3 } from "babylonjs";
import type { TextureValues } from "./drawer";

const TEXTURE_SIZE = 20;
/** In `px` */
const TEXTURE_RESOLUTION = 512;
const DEFAULT_FIELD_SIZE = 128;
const DEFAULT_ALIVE_CELL_BASE = [2, 7];
const getCellSize = (fieldSize: number) => TEXTURE_RESOLUTION / fieldSize - 1;
const DEFAULT_SPEED = 3;
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
const DEFAULT_LIFESPAN = 200;

const SCENE_BACKGROUND_COLOR_DEFAULT = new Color4(0, 0, 0.1, 0);
const CAMERA_ALPHA_DEFAULT = -Math.PI/2
const CAMERA_BETA_DEFAULT = Math.PI / 3
const CAMERA_RADIUS_DEFAULT = 25
const CAMERA_TARGET_DEFAULT = Vector3.Zero()
const CAMERA_DEFAULTS = {
  alpha: CAMERA_ALPHA_DEFAULT,
  beta: CAMERA_BETA_DEFAULT,
  radius: CAMERA_RADIUS_DEFAULT,
  target: CAMERA_TARGET_DEFAULT
}
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
  DEFAULT_FIELD_SIZE,
  DEFAULT_ALIVE_CELL_BASE,
  getCellSize,
  DEFAULT_SPEED,
  TEXTURE_DEFAULTS,
  DEFAULT_LIFESPAN,

  SCENE_BACKGROUND_COLOR_DEFAULT,

  CAMERA_DEFAULTS,
  EFFCT_DEFAULTS,
}
