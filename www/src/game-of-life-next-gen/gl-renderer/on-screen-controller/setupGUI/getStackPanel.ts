import * as GUI from 'babylonjs-gui'

export default function getStackPanel(width: string | number, paddingRight: string | number, horizontalAlignment: number, verticalAlignment: number): { panel: GUI.StackPanel, svcontainer: GUI.StackPanel } {
  const panel = new GUI.StackPanel();
  panel.width = width;
  panel.height = "100%";
  panel.isVertical = true;
  panel.paddingRight = paddingRight;
  panel.horizontalAlignment = horizontalAlignment;
  panel.verticalAlignment = verticalAlignment;
  panel.isPointerBlocker = true

  const sv = new GUI.ScrollViewer("sv");
  sv.width = "100%";
  sv.height = "100%";
  sv.thickness = 0;
  sv.barSize = 15;
  panel.addControl(sv)

  const svcontainer = new GUI.StackPanel("svcontainer");
  sv.addControl(svcontainer);

  return { panel, svcontainer }
}
