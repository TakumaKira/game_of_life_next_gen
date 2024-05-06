import * as GUI from 'babylonjs-gui'

export default function addSlider(panel: GUI.StackPanel, text: string, onChangeValue: (value: number) => void, initialValue: number | undefined, min: number, max: number, left: string) {
  const header = new GUI.TextBlock();
  header.text = text;
  header.height = "30px";
  header.color = "white";
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.addControl(header);
  if (left) {
    header.left = left;
  }

  const slider = new GUI.Slider();
  slider.minimum = min;
  slider.maximum = max;
  if (initialValue) {
    slider.value = initialValue;
  }
  slider.height = "20px";
  slider.color = "green";
  slider.background = "white";
  slider.onValueChangedObservable.add(onChangeValue);

  if (left) {
    slider.paddingLeft = left;
  }
  panel.addControl(slider);
}
