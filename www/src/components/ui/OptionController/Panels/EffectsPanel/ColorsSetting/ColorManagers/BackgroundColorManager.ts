import type IColorManager from "./IColorManager";

const BackgroundColorManager: IColorManager = {
  key: 'backgroundColor',
  label: 'Background',
  setPickerColor({ setSelectedColorValue, glColors }) {
    setSelectedColorValue({ color: glColors.backgroundColor })
  },
  updateColorValue({ onChangeGlValuesConfigurable, color }) {
    onChangeGlValuesConfigurable({ backgroundColor: color })
  },
} as const
export default BackgroundColorManager