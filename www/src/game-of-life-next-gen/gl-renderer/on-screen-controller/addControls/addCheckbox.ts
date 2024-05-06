import * as GUI from 'babylonjs-gui'

export default function addCheckbox(panel: GUI.StackPanel, text: string, onChangeValue: (value: boolean) => void, initialValue?: boolean, left?: string) {
  const checkbox = new GUI.Checkbox();
  checkbox.width = "20px";
  checkbox.height = "20px";
  if (initialValue) {
    checkbox.isChecked = initialValue;
  }
  checkbox.color = "green";
  checkbox.onIsCheckedChangedObservable.add(onChangeValue);

  const header = GUI.Control.AddHeader(checkbox, text, "180px", { isHorizontal: true, controlFirst: true });
  header.height = "30px";
  header.color = "white";
  header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  if (left) {
    header.left = left;
  }
  panel.addControl(header);
}
