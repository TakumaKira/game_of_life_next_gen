import type { ArcRotateCamera, Scene } from 'babylonjs'
import { DefaultRenderingPipeline } from 'babylonjs'
import { EFFCT_DEFAULTS } from '@/game-of-life-next-gen/constants';

export default function getDefaultRenderPipeline(name: string, scene: Scene, camera: ArcRotateCamera, effectDefaults: typeof EFFCT_DEFAULTS): DefaultRenderingPipeline {
  const defaultPipeline = new DefaultRenderingPipeline(name, true, scene, [camera]);
  defaultPipeline.bloomEnabled = effectDefaults.BLOOM_ENABLED;
  defaultPipeline.fxaaEnabled = effectDefaults.FXAA_ENABLED;
  defaultPipeline.bloomWeight = effectDefaults.BLOOM_WEIGHT;
  defaultPipeline.imageProcessingEnabled = effectDefaults.IMAGE_PROCESSING.ENABLED;
  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.toneMappingEnabled = effectDefaults.IMAGE_PROCESSING.TONE_MAPPING_ENABLED;
    defaultPipeline.imageProcessing.vignetteEnabled = effectDefaults.IMAGE_PROCESSING.VIGNETTE_ENABLED;
    defaultPipeline.imageProcessing.vignetteWeight = effectDefaults.IMAGE_PROCESSING.VIGNETTE_WEIGHT;
    defaultPipeline.imageProcessing.vignetteColor = effectDefaults.IMAGE_PROCESSING.VIGNETTE_COLOR;
    defaultPipeline.imageProcessing.colorCurvesEnabled = effectDefaults.IMAGE_PROCESSING.COLOR_CURVES_ENABLED;
    defaultPipeline.imageProcessing.contrast = effectDefaults.IMAGE_PROCESSING.CONTRAST;
    defaultPipeline.imageProcessing.exposure = effectDefaults.IMAGE_PROCESSING.EXPOSURE;
  }
  // defaultPipeline.cameraFov = camera.fov;
  return defaultPipeline
}
