import type { DefaultRenderingPipeline, Scene, StandardMaterial } from 'babylonjs'
import { ImageProcessingConfiguration } from 'babylonjs'
import rebindGLValues from './rebindGLValues';
import type { GLValuesConfigurable, GLValuesRebindRequired } from './types';
import { toColor3, toColor4 } from '../utils';

export default function updateGLValues(defaultPipeline: DefaultRenderingPipeline, glValuesRebindRequired: GLValuesRebindRequired, materialGround: StandardMaterial, scene: Scene, updatedValues: Partial<GLValuesConfigurable>) {
  if (updatedValues.backgroundColor !== undefined) {
    scene.clearColor = toColor4(updatedValues.backgroundColor);
  }
  if (updatedValues.specularColor !== undefined) {
    materialGround.specularColor = toColor3(updatedValues.specularColor);
  }
  if (updatedValues.fxaaEnabled !== undefined) {
    defaultPipeline.fxaaEnabled = updatedValues.fxaaEnabled;
    rebindGLValues(defaultPipeline, glValuesRebindRequired);
  }
  if (updatedValues.bloomEnabled !== undefined) {
    defaultPipeline.bloomEnabled = updatedValues.bloomEnabled;
    rebindGLValues(defaultPipeline, glValuesRebindRequired);
  }
  if (updatedValues.bloomWeight !== undefined) {
    defaultPipeline.bloomWeight = updatedValues.bloomWeight;
  }
  if (updatedValues.imageProcessingEnabled !== undefined) {
    defaultPipeline.imageProcessingEnabled = updatedValues.imageProcessingEnabled;
    rebindGLValues(defaultPipeline, glValuesRebindRequired);
  }
  if (updatedValues.toneMappingEnabled !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.toneMappingEnabled = updatedValues.toneMappingEnabled;
    }
    glValuesRebindRequired.toneMappingEnabled = updatedValues.toneMappingEnabled;
  }
  if (updatedValues.vignetteEnabled !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteEnabled = updatedValues.vignetteEnabled;
    }
    glValuesRebindRequired.vignetteEnabled = updatedValues.vignetteEnabled;
  }
  if (updatedValues.vignetteMultiply !== undefined) {
    const blendMode = updatedValues.vignetteMultiply ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
    }
    glValuesRebindRequired.vignetteBlendMode = blendMode;
  }
  if (updatedValues.vignetteColor !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteColor = toColor4(updatedValues.vignetteColor);
    }
    glValuesRebindRequired.vignetteColor = updatedValues.vignetteColor;
  }
  if (updatedValues.vignetteWeight !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteWeight = updatedValues.vignetteWeight;
    }
    glValuesRebindRequired.vignetteWeight = updatedValues.vignetteWeight;
  }
  if (updatedValues.colorCurvesEnabled !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = updatedValues.colorCurvesEnabled;
    }
    glValuesRebindRequired.colorCurvesEnabled = updatedValues.colorCurvesEnabled;
  }
  if (updatedValues.contrast !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.contrast = updatedValues.contrast;
    }
    glValuesRebindRequired.contrast = updatedValues.contrast;
  }
  if (updatedValues.exposure !== undefined) {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.exposure = updatedValues.exposure;
    }
    glValuesRebindRequired.exposure = updatedValues.exposure;
  }
}
