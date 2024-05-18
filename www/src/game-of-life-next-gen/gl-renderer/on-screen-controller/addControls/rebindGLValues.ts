import type { DefaultRenderingPipeline } from 'babylonjs'
import type { GLValues } from '../types';

export default function rebindGLValues(defaultPipeline: DefaultRenderingPipeline, values: GLValues) {
  if (defaultPipeline.imageProcessing) {
    const {
      toneMappingEnabled,
      vignetteEnabled,
      vignetteWeight,
      vignetteColor,
      vignetteBlendMode,
      colorCurvesEnabled,
      contrast,
      exposure,
      curve,
    } = values;
    if (toneMappingEnabled) {
      defaultPipeline.imageProcessing.toneMappingEnabled = toneMappingEnabled;
    }
    if (vignetteEnabled) {
      defaultPipeline.imageProcessing.vignetteEnabled = vignetteEnabled;
    }
    if (vignetteWeight) {
      defaultPipeline.imageProcessing.vignetteWeight = vignetteWeight;
    }
    if (vignetteColor) {
      defaultPipeline.imageProcessing.vignetteColor = vignetteColor;
    }
    if (vignetteBlendMode) {
      defaultPipeline.imageProcessing.vignetteBlendMode = vignetteBlendMode;
    }
    if (colorCurvesEnabled) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = colorCurvesEnabled;
    }
    if (contrast) {
      defaultPipeline.imageProcessing.contrast = contrast;
    }
    if (exposure) {
      defaultPipeline.imageProcessing.exposure = exposure;
    }
    if (curve) {
      defaultPipeline.imageProcessing.colorCurves = curve;
    }
  }
}
