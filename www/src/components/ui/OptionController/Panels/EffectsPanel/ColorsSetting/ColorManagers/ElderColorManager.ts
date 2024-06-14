import type IColorManager from "./IColorManager";

const ElderColorManager: IColorManager = {
  key: 'elderColor',
  label: 'Elder Cell',
  setPickerColor({ setSelectedColorValue, textureColors }) {
    setSelectedColorValue({ hex8String: textureColors.aliveColors[2] })
  },
  updateColorValue({ onChangeTextureColors, hex8String }) {
    onChangeTextureColors({ aliveColors: [undefined, undefined, hex8String] })
  },
} as const
export default ElderColorManager