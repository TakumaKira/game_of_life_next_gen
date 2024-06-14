import BackgroundColorManager from "./BackgroundColorManager"
import DeadColorManager from "./DeadColorManager"
import ElderColorManager from "./ElderColorManager"
import GridColorManager from "./GridColorManager"
import type IColorManager from "./IColorManager"
import MiddleColorManager from "./MiddleColorManager"
import SpecularColorManager from "./SpecularColorManager"
import YoungColorManager from "./YoungColorManager"

export type ColorManagerKeys
  = 'backgroundColor'
  | 'specularColor'
  | 'gridColor'
  | 'youngColor'
  | 'middleColor'
  | 'elderColor'
  | 'deadColor'

const ColorManagers: { [key in ColorManagerKeys]: IColorManager } = {
  backgroundColor: BackgroundColorManager,
  specularColor: SpecularColorManager,
  gridColor: GridColorManager,
  youngColor: YoungColorManager,
  middleColor: MiddleColorManager,
  elderColor: ElderColorManager,
  deadColor: DeadColorManager,
}
export default ColorManagers