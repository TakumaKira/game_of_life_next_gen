import React from 'react'
import OptionButtons from './OptionButtons'
import Drawer from './Drawer'
import { OptionPanels } from './types'
import GameRules from './GameRules'
import Effects from './Effects'
import Stats from './Stats'

export default function OptionController() {
  const [openedPanel, setOpenedPanel] = React.useState<OptionPanels>(OptionPanels.NONE)
  const [delayedOpenedPanel, setDelayedOpenedPanel] = React.useState<OptionPanels>(OptionPanels.NONE)
  React.useEffect(() => {
    if (openedPanel !== OptionPanels.NONE) {
      setDelayedOpenedPanel(openedPanel)
      return
    }
    setTimeout(() => setDelayedOpenedPanel(OptionPanels.NONE), 300)
  }, [openedPanel])
  return (
    <>
      <OptionButtons onSelectOpenedPanel={setOpenedPanel} />
      {<Drawer
        onClose={() => setOpenedPanel(OptionPanels.NONE)}
        width={{
          [OptionPanels.NONE]: 0,
          [OptionPanels.GAME_RULES]: 720,
          [OptionPanels.EFFECTS]: 600,
          [OptionPanels.STATS]: 480,
        }[openedPanel]}
      >
        {{
          [OptionPanels.NONE]: null,
          [OptionPanels.GAME_RULES]: <GameRules />,
          [OptionPanels.EFFECTS]: <Effects />,
          [OptionPanels.STATS]: <Stats />,
        }[delayedOpenedPanel]}
      </Drawer>}
    </>
  )
}
