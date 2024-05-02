import * as GUI from 'babylonjs-gui'
import type { Color3, Color4 } from 'babylonjs'

export default function addColorPicker(panel: GUI.StackPanel, text: string, onChangeValue: (value: Color4) => void, initialValue: Color4 | undefined, left: string) {
  const header = new GUI.TextBlock();
  header.text = text;
  header.height = "30px";
  header.color = "white";
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.addControl(header);
  if (left) {
    header.left = left;
  }

  const colorPicker = new GUI.ColorPicker();
  if (initialValue) {
    colorPicker.value = initialValue as unknown as Color3;
  }
  colorPicker.size = "100px";
  colorPicker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  colorPicker.onValueChangedObservable.add(value => onChangeValue(value as unknown as Color4));
  if (left) {
    colorPicker.left = left;
  }
  panel.addControl(colorPicker);
}
