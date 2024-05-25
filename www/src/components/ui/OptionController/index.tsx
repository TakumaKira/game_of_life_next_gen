import React from 'react'
import OptionButtons from './OptionButtons'
import Drawer from './Drawer'
import { OptionPanels } from './types'
import GameRules, { WIDTH as GAME_RULES_WIDTH } from './GameRules'
import Effects, { WIDTH as EFFECTS_WIDTH } from './Effects'
import Stats, { WIDTH as STATS_WIDTH } from './Stats'

export default function OptionController() {
  const [openedPanel, setOpenedPanel] = React.useState<OptionPanels>(OptionPanels.NONE)
  return (
    <>
      <OptionButtons onSelectOpenedPanel={setOpenedPanel} />
      {<Drawer
        onClose={() => setOpenedPanel(OptionPanels.NONE)}
        width={{
          [OptionPanels.NONE]: 0,
          [OptionPanels.GAME_RULES]: GAME_RULES_WIDTH,
          [OptionPanels.EFFECTS]: EFFECTS_WIDTH,
          [OptionPanels.STATS]: STATS_WIDTH,
        }[openedPanel]}
      >
        {{
          [OptionPanels.NONE]: null,
          [OptionPanels.GAME_RULES]: <GameRules />,
          [OptionPanels.EFFECTS]: <Effects />,
          [OptionPanels.STATS]: <Stats />,
        }[openedPanel]}
      </Drawer>}
    </>
  )
}
