import type IColorManager from "./IColorManager";

const MiddleColorManager: IColorManager = {
  key: 'middleColor',
  label: 'Middle Cell',
  setPickerColor({ setSelectedColorValue, textureColors }) {
    setSelectedColorValue({ hex8String: textureColors.aliveColors[1] })
  },
  updateColorValue({ onChangeTextureColors, hex8String }) {
    onChangeTextureColors({ aliveColors: [undefined, hex8String, undefined] })
  },
} as const
export default MiddleColorManager