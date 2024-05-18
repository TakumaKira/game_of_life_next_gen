import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import type { GLValues } from '../types';

export default function buildGLValues(defaultPipeline: DefaultRenderingPipeline, scene: Scene): GLValues {
  return {
    toneMappingEnabled: defaultPipeline.imageProcessing?.toneMappingEnabled,
    vignetteEnabled: defaultPipeline.imageProcessing?.vignetteEnabled,
    vignetteColor: defaultPipeline.imageProcessing?.vignetteColor,
    vignetteWeight: defaultPipeline.imageProcessing?.vignetteWeight,
    vignetteBlendMode: defaultPipeline.imageProcessing?.vignetteBlendMode,
    colorCurvesEnabled: defaultPipeline.imageProcessing?.colorCurvesEnabled,
    contrast: defaultPipeline.imageProcessing?.contrast,
    exposure: defaultPipeline.imageProcessing?.exposure,
    curve: defaultPipeline.imageProcessing.colorCurves,
    backgroundColor: scene.clearColor,
  }
}
