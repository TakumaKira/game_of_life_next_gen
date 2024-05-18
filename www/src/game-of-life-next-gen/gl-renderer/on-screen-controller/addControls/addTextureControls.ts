import * as GUI from 'babylonjs-gui'
import addColorPicker from './addColorPicker';
import type { TextureValues } from '@/game-of-life-next-gen/drawer';

export default function addTextureControls(panel: GUI.StackPanel, textureValues: TextureValues) {
  addColorPicker(panel, "grid color", value => {
    textureValues.gridColor = value;
  }, textureValues.gridColor);

  addColorPicker(panel, "dead color", value => {
    textureValues.deadColor = value;
  }, textureValues.deadColor);

  addColorPicker(panel, "alive color 1", value => {
    textureValues.aliveColors[0] = value;
  }, textureValues.aliveColors[0]);

  addColorPicker(panel, "alive color 2", value => {
    textureValues.aliveColors[1] = value;
  }, textureValues.aliveColors[1]);

  addColorPicker(panel, "alive color 3", value => {
    textureValues.aliveColors[2] = value;
  }, textureValues.aliveColors[2]);
}
