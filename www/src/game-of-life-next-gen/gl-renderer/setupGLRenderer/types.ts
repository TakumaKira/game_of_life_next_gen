import { Color } from '@/game-of-life-next-gen/types'
import type { Nullable, ColorCurves } from 'babylonjs'

export type GLValuesRebindRequiredConfigurable = {
  toneMappingEnabled: boolean,
  vignetteEnabled: boolean,
  vignetteColor: Color,
  vignetteWeight: number,
  vignetteBlendMode: number,
  colorCurvesEnabled: boolean,
  contrast: number,
  exposure: number,
}

export type GLValuesRebindRequired = GLValuesRebindRequiredConfigurable & {
  curve: Nullable<ColorCurves>,
}

export type GLValuesConfigurable = GLValuesRebindRequiredConfigurable & {
  backgroundColor: Color,
  specularColor: Color,
  fxaaEnabled: boolean,
  bloomEnabled: boolean,
  bloomWeight: number,
  imageProcessingEnabled: boolean,
  vignetteMultiply: boolean,
}
