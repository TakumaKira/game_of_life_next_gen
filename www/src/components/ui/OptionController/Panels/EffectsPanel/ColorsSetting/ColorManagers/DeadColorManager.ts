import type IColorManager from "./IColorManager";

const DeadColorManager: IColorManager = {
  key: 'deadColor',
  label: 'Dead Cell',
  setPickerColor({ setSelectedColorValue, textureColors }) {
    setSelectedColorValue({ hex8String: textureColors.deadColor })
  },
  updateColorValue({ onChangeTextureColors, hex8String }) {
    onChangeTextureColors({ deadColor: hex8String })
  },
} as const
export default DeadColorManager