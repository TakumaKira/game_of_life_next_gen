import type { Nullable, Color4, ColorCurves } from 'babylonjs'

export type Values = {
  toneMappingEnabled?: boolean,
  vignetteEnabled?: boolean,
  vignetteColor?: Color4,
  vignetteWeight?: number,
  vignetteBlendMode?: number,
  colorCurvesEnabled?: boolean,
  contrast?: number,
  exposure?: number,
  curve: Nullable<ColorCurves>,
  backgroundColor?: Color4,
}
