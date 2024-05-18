import { TEXTURE_DEFAULTS } from '@/game-of-life-next-gen/constants';
import type { TextureValues } from '@/game-of-life-next-gen/drawer';

export default function buildTextureValues(textureDefaults: TextureValues): TextureValues {
  return {
    gridColor: TEXTURE_DEFAULTS.gridColor,
    deadColor: TEXTURE_DEFAULTS.deadColor,
    aliveColors: TEXTURE_DEFAULTS.aliveColors,
  }
}
