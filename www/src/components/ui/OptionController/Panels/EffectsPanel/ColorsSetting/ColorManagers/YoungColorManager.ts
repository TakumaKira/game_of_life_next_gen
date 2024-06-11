import type IColorManager from "./IColorManager";

const YoungColorManager: IColorManager = {
  key: 'youngColor',
  label: 'Young Cell',
  setPickerColor({ setSelectedColorValue, textureColors }) {
    setSelectedColorValue({ hex8String: textureColors.aliveColors[0] })
  },
  updateColorValue({ onChangeTextureColors, hex8String }) {
    onChangeTextureColors({ aliveColors: [hex8String, undefined, undefined] })
  },
} as const
export default YoungColorManager