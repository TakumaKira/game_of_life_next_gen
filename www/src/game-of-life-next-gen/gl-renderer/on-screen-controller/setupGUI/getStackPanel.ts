import * as GUI from 'babylonjs-gui'

export default function getStackPanel(width: string | number, isVertical: boolean, paddingRight: string | number, horizontalAlignment: number, verticalAlignment: number): GUI.StackPanel {
  const panel = new GUI.StackPanel();
  panel.width = width;
  panel.isVertical = isVertical;
  panel.paddingRight = paddingRight;
  panel.horizontalAlignment = horizontalAlignment;
  panel.verticalAlignment = verticalAlignment;
  return panel
}
