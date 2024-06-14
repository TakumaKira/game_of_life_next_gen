import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import type { GLValuesRebindRequired } from './types'
import { toColor } from '../utils'

export default function buildGLValuesRebindRequired(defaultPipeline: DefaultRenderingPipeline): GLValuesRebindRequired {
  return {
    toneMappingEnabled: defaultPipeline.imageProcessing?.toneMappingEnabled,
    vignetteEnabled: defaultPipeline.imageProcessing?.vignetteEnabled,
    vignetteColor: toColor(defaultPipeline.imageProcessing?.vignetteColor),
    vignetteWeight: defaultPipeline.imageProcessing?.vignetteWeight,
    vignetteBlendMode: defaultPipeline.imageProcessing?.vignetteBlendMode,
    colorCurvesEnabled: defaultPipeline.imageProcessing?.colorCurvesEnabled,
    contrast: defaultPipeline.imageProcessing?.contrast,
    exposure: defaultPipeline.imageProcessing?.exposure,
    curve: defaultPipeline.imageProcessing.colorCurves,
  }
}
