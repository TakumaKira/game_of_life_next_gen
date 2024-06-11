import { SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_COLORS_DEFAULT, TEXTURE_SPECULAR_COLOR_DEFAULT } from '@/game-of-life-next-gen/constants';
import type { RadioSelectorOption } from '../../RadioSelector/types';
import ColorManagers from './ColorManagers';

export const keyOptions: RadioSelectorOption[] = Object.entries(ColorManagers).map(([key, manager]) => ({ key, label: manager.label }))
export const DEFAULT_GL_COLORS = {
  backgroundColor: SCENE_BACKGROUND_COLOR_DEFAULT,
  specularColor: TEXTURE_SPECULAR_COLOR_DEFAULT,
} as const
export const DEFAULT_TEXTURE_COLORS = {
  gridColor: TEXTURE_COLORS_DEFAULT.gridColor,
  youngColor: TEXTURE_COLORS_DEFAULT.aliveColors[0],
  middleColor: TEXTURE_COLORS_DEFAULT.aliveColors[1],
  elderColor: TEXTURE_COLORS_DEFAULT.aliveColors[2],
  deadColor: TEXTURE_COLORS_DEFAULT.deadColor,
} as const
