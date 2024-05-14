import * as GUI from 'babylonjs-gui'
import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import { ImageProcessingConfiguration } from 'babylonjs'
import type { GLValues } from '../types';
import addCheckbox from './addCheckbox';
import addSlider from './addSlider';
import addColorPicker from './addColorPicker';
import rebindGLValues from './rebindGLValues';

export default function addGLControls(panel: GUI.StackPanel, defaultPipeline: DefaultRenderingPipeline, glValues: GLValues, scene: Scene) {
  addColorPicker(panel, "background color", value => {
    scene.clearColor = value;
    glValues.backgroundColor = value;
  }, glValues.backgroundColor);

  addCheckbox(panel, "fxaa", value => {
    defaultPipeline.fxaaEnabled = value;
    rebindGLValues(defaultPipeline, glValues);
  }, defaultPipeline.fxaaEnabled );

  addCheckbox(panel, "bloom", value => {
    defaultPipeline.bloomEnabled = value;
    rebindGLValues(defaultPipeline, glValues);
  }, defaultPipeline.bloomEnabled);

  addSlider(panel, "bloom weight", value => {
    defaultPipeline.bloomWeight = value;
  }, defaultPipeline.bloomWeight, 0, 2, "20px");

  addCheckbox(panel, "image processing", value => {
    defaultPipeline.imageProcessingEnabled = value;
    rebindGLValues(defaultPipeline, glValues);
  }, defaultPipeline.imageProcessingEnabled);

  addCheckbox(panel, "tone mapping", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.toneMappingEnabled = value;
    }
    glValues.toneMappingEnabled = value;
  }, glValues.toneMappingEnabled, "20px");

  addCheckbox(panel, "vignette", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteEnabled = value;
    }
    glValues.vignetteEnabled = value;
  }, glValues.vignetteEnabled, "20px");

  addCheckbox(panel, "vignette multiply", value => {
    const blendMode = value ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
    }
    glValues.vignetteBlendMode = blendMode;
  }, glValues.vignetteBlendMode === ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY, "40px");

  addColorPicker(panel, "vignette color", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteColor = value;
    }
    glValues.vignetteColor = value;
  }, glValues.vignetteColor, "40px");

  addSlider(panel, "vignette weight", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteWeight = value;
    }
    glValues.vignetteWeight = value;
  }, glValues.vignetteWeight, 0, 10, "40px");

  addCheckbox(panel, "color curves", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = value;
    }
    glValues.colorCurvesEnabled = value;
  }, glValues.colorCurvesEnabled, "20px");

  addSlider(panel, "camera contrast", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.contrast = value;
    }
    glValues.contrast = value;
  }, glValues.contrast, 0, 4, "20px");

  addSlider(panel, "camera exposure", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.exposure = value;
    }
    glValues.exposure = value;
  }, glValues.exposure, 0, 4, "20px");
}
