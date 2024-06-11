import type IColorManager from "./IColorManager";

const GridColorManager: IColorManager = {
  key: 'gridColor',
  label: 'Grid',
  setPickerColor({ setSelectedColorValue, textureColors }) {
    setSelectedColorValue({ hex8String: textureColors.gridColor })
  },
  updateColorValue({ onChangeTextureColors, hex8String }) {
    onChangeTextureColors({ gridColor: hex8String })
  },
} as const
export default GridColorManager