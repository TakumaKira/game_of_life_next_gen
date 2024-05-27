import type { ArcRotateCamera, Scene } from 'babylonjs'
import { DefaultRenderingPipeline, ImageProcessingConfiguration } from 'babylonjs'
import { GL_VALUES_CONFIGURABLE_DEFAULTS } from '@/game-of-life-next-gen/constants';
import { toColor4 } from '../utils';

export default function getDefaultRenderPipeline(name: string, scene: Scene, camera: ArcRotateCamera, glValuesConfigurableDefaults: typeof GL_VALUES_CONFIGURABLE_DEFAULTS): DefaultRenderingPipeline {
  const defaultPipeline = new DefaultRenderingPipeline(name, true, scene, [camera]);
  defaultPipeline.fxaaEnabled = glValuesConfigurableDefaults.fxaaEnabled;
  defaultPipeline.bloomEnabled = glValuesConfigurableDefaults.bloomEnabled;
  defaultPipeline.bloomWeight = glValuesConfigurableDefaults.bloomWeight;
  defaultPipeline.imageProcessingEnabled = glValuesConfigurableDefaults.imageProcessingEnabled;
  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.toneMappingEnabled = glValuesConfigurableDefaults.toneMappingEnabled;
    defaultPipeline.imageProcessing.vignetteEnabled = glValuesConfigurableDefaults.vignetteEnabled;
    const blendMode = glValuesConfigurableDefaults.vignetteMultiply ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
    defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
    defaultPipeline.imageProcessing.vignetteColor = toColor4(glValuesConfigurableDefaults.vignetteColor);
    defaultPipeline.imageProcessing.vignetteWeight = glValuesConfigurableDefaults.vignetteWeight;
    defaultPipeline.imageProcessing.colorCurvesEnabled = glValuesConfigurableDefaults.colorCurvesEnabled;
    defaultPipeline.imageProcessing.contrast = glValuesConfigurableDefaults.contrast;
    defaultPipeline.imageProcessing.exposure = glValuesConfigurableDefaults.exposure;
  }
  // defaultPipeline.cameraFov = camera.fov;
  return defaultPipeline
}
