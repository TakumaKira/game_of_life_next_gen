import React from 'react';
import styled from 'styled-components';
import Fonts from '../components/Fonts';
import Drawer from '../components/ui/OptionController/Drawer';
import PlayControllerButtonTooltip from '@/components/ui/PlayController/PlayControllerButtonTooltip';
import PlayControllerButtonBase from '@/components/ui/PlayController/PlayControllerButtonBase';
import { CameraResetSVG, EffectSettingSVG } from '@/components/SVG';
import OptionButtonTooltip from '@/components/ui/OptionController/OptionButtons/OptionButtonTooltip';
import OptionButtonBase from '@/components/ui/OptionController/OptionButtons/OptionButtonBase';
import FPSDisplay from '@/components/ui/FPSDisplay';
import { OptionPanels } from '@/components/ui/OptionController/types';
import GameRulesPanel, { TITLE as GAME_RULES_PANEL_TITLE, WIDTH as GAME_RULES_PANEL_WIDTH } from '@/components/ui/OptionController/Panels/GameRulesPanel'
import EffectsPanel, { TITLE as EFFECTS_PANEL_TITLE, WIDTH as EFFECTS_PANEL_WIDTH } from '@/components/ui/OptionController/Panels/EffectsPanel'
import StatsPanel, { TITLE as STATS_PANEL_TITLE, WIDTH as STATS_PANEL_WIDTH } from '@/components/ui/OptionController/Panels/StatsPanel'

const Container = styled.div<{ backgroundColor: string }>`
  height: 100vh;
  background-color: ${props => props.backgroundColor};
`

const BottomContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
`
const CameraResetIcon = PlayControllerButtonBase(CameraResetSVG)

const LeftContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 400px;
`
const EffectSettingIcon = OptionButtonBase(EffectSettingSVG)

export default function Colors({
  backgroundColor,
  openedPanel,
}: {
  backgroundColor: string
  openedPanel: OptionPanels
}) {
  return (
    <>
      <Fonts />
      <Container backgroundColor={backgroundColor}>
        <BottomContainer>
          <PlayControllerButtonTooltip $text="Reset Camera" $iconSize={36} onClick={() => {}}>
            <CameraResetIcon $size={36} />
          </PlayControllerButtonTooltip>
        </BottomContainer>
        <LeftContainer>
          <OptionButtonTooltip $text="Colors and Effects" $iconSize={36} onClick={() => {}}>
            <EffectSettingIcon $size={36} />
          </OptionButtonTooltip>
        </LeftContainer>
        <FPSDisplay fpsData={{ fps: 60, mean: 60, min: 1, max: 101 }} />
        <Drawer
          onClose={() => {}}
          title={{
            [OptionPanels.NONE]: '',
            [OptionPanels.GAME_RULES]: GAME_RULES_PANEL_TITLE,
            [OptionPanels.EFFECTS]: EFFECTS_PANEL_TITLE,
            [OptionPanels.STATS]: STATS_PANEL_TITLE,
          }[openedPanel] || ''}
          width={{
            [OptionPanels.NONE]: 0,
            [OptionPanels.GAME_RULES]: GAME_RULES_PANEL_WIDTH,
            [OptionPanels.EFFECTS]: EFFECTS_PANEL_WIDTH,
            [OptionPanels.STATS]: STATS_PANEL_WIDTH,
          }[openedPanel] || 0}
        >
          {{
            [OptionPanels.NONE]: null,
            [OptionPanels.GAME_RULES]:
              <GameRulesPanel
                fieldSize={128}
                onChangeFieldSize={() => {}}
                lifespan={200}
                onChangeLifespan={() => {}}
                speed={3}
                onChangeSpeed={() => {}}
                aliveCellBaseOptions={[...new Array(10)].map((_, i) => i + 1)}
                aliveCellBase={{ 1: false, 2: true, 3: false, 4: false, 5: false, 6: false, 7: true, 8: false, 9: false, 10: false }}
                onChangeAliveCellBase={() => {}}
                autoStartOnChangeGameRules={true}
                onChangeAutoStartOnChangeGameRules={() => {}}
              />,
            [OptionPanels.EFFECTS]:
              <EffectsPanel
                textureColors={{ gridColor: '#000000ff', deadColor: '#111111ff', aliveColors: [ '#ff0000ff', '#ffff00ff', '#0000ffff' ] }}
                onChangeTextureColors={() => {}}
                glValuesConfigurable={{ backgroundColor: { r: 27, g: 27, b: 27, a: 1 }, specularColor: { r: 27, g: 27, b: 27, a: 1 }, fxaaEnabled: false, bloomEnabled: true, bloomWeight: 1, imageProcessingEnabled: true, vignetteMultiply: false, toneMappingEnabled: false, vignetteEnabled: true, vignetteColor: { r: 0, g: 0, b: 255, a: 1 }, vignetteWeight: 10, colorCurvesEnabled: false, contrast: 1.2, exposure: 4 }}
                onChangeGlValuesConfigurable={() => {}}
              />,
            [OptionPanels.STATS]:
              <StatsPanel
                showFPS={true}
                onChangeShowFPS={() => {}}
                showWasmLogOnNextFrame={false}
                onChangeShowWasmLogOnNextFrame={() => {}}
              />,
          }[openedPanel]}
        </Drawer>
      </Container>
    </>
  )
}