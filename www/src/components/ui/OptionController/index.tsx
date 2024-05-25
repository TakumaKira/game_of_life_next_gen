import React from 'react'
import OptionButtons from './OptionButtons'
import Drawer from './Drawer'
import { OptionPanels } from './types'
import GameRulesPanel, { TITLE as GAME_RULES_PANEL_TITLE, WIDTH as GAME_RULES_PANEL_WIDTH } from './Panels/GameRulesPanel'
import EffectsPanel, { TITLE as EFFECTS_PANEL_TITLE, WIDTH as EFFECTS_PANEL_WIDTH } from './Panels/EffectsPanel'
import StatsPanel, { TITLE as STATS_PANEL_TITLE, WIDTH as STATS_PANEL_WIDTH } from './Panels/StatsPanel'

export default function OptionController({
  fieldSize,
  onChangeFieldSize,
  lifespan,
  onChangeLifespan,
  speed,
  onChangeSpeed,
  aliveCellBaseOptions,
  aliveCellBase,
  onChangeAliveCellBase,
  autoStartOnChangeGameRules,
  onChangeAutoStartOnChangeGameRules,
  showFPS,
  onChangeShowFPS,
  showWasmLogOnNextFrame,
  onChangeShowWasmLogOnNextFrame,
}: {
  fieldSize: number
  onChangeFieldSize: (fieldSize: number) => void
  lifespan: number
  onChangeLifespan: (lifespan: number) => void
  speed: number
  onChangeSpeed: (speed: number) => void
  aliveCellBaseOptions: number[]
  aliveCellBase: { [number: number]: boolean }
  onChangeAliveCellBase: (aliveCellBase: { [number: number]: boolean }) => void
  autoStartOnChangeGameRules: boolean
  onChangeAutoStartOnChangeGameRules: (autoStartOnChangeGameRules: boolean) => void
  showFPS: boolean
  onChangeShowFPS: (showFPS: boolean) => void
  showWasmLogOnNextFrame: boolean
  onChangeShowWasmLogOnNextFrame: (showWasmLogOnNextFrame: boolean) => void
}) {
  const [openedPanel, setOpenedPanel] = React.useState<OptionPanels>(OptionPanels.NONE)
  return (
    <>
      <OptionButtons onSelectOpenedPanel={setOpenedPanel} />
      {<Drawer
        onClose={() => setOpenedPanel(OptionPanels.NONE)}
        title={{
          [OptionPanels.NONE]: '',
          [OptionPanels.GAME_RULES]: GAME_RULES_PANEL_TITLE,
          [OptionPanels.EFFECTS]: EFFECTS_PANEL_TITLE,
          [OptionPanels.STATS]: STATS_PANEL_TITLE,
        }[openedPanel]}
        width={{
          [OptionPanels.NONE]: 0,
          [OptionPanels.GAME_RULES]: GAME_RULES_PANEL_WIDTH,
          [OptionPanels.EFFECTS]: EFFECTS_PANEL_WIDTH,
          [OptionPanels.STATS]: STATS_PANEL_WIDTH,
        }[openedPanel]}
      >
        {{
          [OptionPanels.NONE]: null,
          [OptionPanels.GAME_RULES]:
            <GameRulesPanel
              fieldSize={fieldSize}
              onChangeFieldSize={onChangeFieldSize}
              lifespan={lifespan}
              onChangeLifespan={onChangeLifespan}
              speed={speed}
              onChangeSpeed={onChangeSpeed}
              aliveCellBaseOptions={aliveCellBaseOptions}
              aliveCellBase={aliveCellBase}
              onChangeAliveCellBase={onChangeAliveCellBase}
              autoStartOnChangeGameRules={autoStartOnChangeGameRules}
              onChangeAutoStartOnChangeGameRules={onChangeAutoStartOnChangeGameRules}
            />,
          [OptionPanels.EFFECTS]:
            <EffectsPanel />,
          [OptionPanels.STATS]:
            <StatsPanel
              showFPS={showFPS}
              onChangeShowFPS={onChangeShowFPS}
              showWasmLogOnNextFrame={showWasmLogOnNextFrame}
              onChangeShowWasmLogOnNextFrame={onChangeShowWasmLogOnNextFrame}
            />,
        }[openedPanel]}
      </Drawer>}
    </>
  )
}
