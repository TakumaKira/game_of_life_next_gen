import React from 'react'
import OptionButtons from './OptionButtons'
import Drawer from './Drawer'
import { OptionPanels } from './types'
import GameRulesPanel, { WIDTH as GAME_RULES_PANEL_WIDTH } from './Panels/GameRulesPanel'
import EffectsPanel, { WIDTH as EFFECTS_PANEL_WIDTH } from './Panels/EffectsPanel'
import StatsPanel, { WIDTH as STATS_PANEL_WIDTH } from './Panels/StatsPanel'

export default function OptionController() {
  const [openedPanel, setOpenedPanel] = React.useState<OptionPanels>(OptionPanels.NONE)
  return (
    <>
      <OptionButtons onSelectOpenedPanel={setOpenedPanel} />
      {<Drawer
        onClose={() => setOpenedPanel(OptionPanels.NONE)}
        width={{
          [OptionPanels.NONE]: 0,
          [OptionPanels.GAME_RULES]: GAME_RULES_PANEL_WIDTH,
          [OptionPanels.EFFECTS]: EFFECTS_PANEL_WIDTH,
          [OptionPanels.STATS]: STATS_PANEL_WIDTH,
        }[openedPanel]}
      >
        {{
          [OptionPanels.NONE]: null,
          [OptionPanels.GAME_RULES]: <GameRulesPanel />,
          [OptionPanels.EFFECTS]: <EffectsPanel />,
          [OptionPanels.STATS]: <StatsPanel />,
        }[openedPanel]}
      </Drawer>}
    </>
  )
}
