import type IColorManager from "./IColorManager";

const SpecularColorManager: IColorManager = {
  key: 'specularColor',
  label: 'Texture Specular',
  setPickerColor({ setSelectedColorValue, glColors }) {
    setSelectedColorValue({ color: glColors.specularColor })
  },
  updateColorValue({ onChangeGlValuesConfigurable, color }) {
    onChangeGlValuesConfigurable({ specularColor: color })
  },
} as const
export default SpecularColorManager