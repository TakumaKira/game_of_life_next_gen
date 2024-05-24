import { EffectSettingSVG, GameSettingSVG, StatsSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import OptionButtonBase from './OptionButtonBase';
import OptionButtonTooltip from './OptionButtonTooltip';
import { OptionPanels } from './types';

const Container = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
const GameSettingIcon = OptionButtonBase(GameSettingSVG)
const EffectSettingIcon = OptionButtonBase(EffectSettingSVG)
const StatsIcon = OptionButtonBase(StatsSVG)

export default function OptionButtons({
  onSelectOpenedPanel,
}: {
  onSelectOpenedPanel: (selectedPanel: OptionPanels) => void
}) {
  return (
    <Container>
      <OptionButtonTooltip $text="Game Rules" onClick={() => onSelectOpenedPanel(OptionPanels.GAME_RULES)}>
        <GameSettingIcon />
      </OptionButtonTooltip>
      <OptionButtonTooltip $text="Colors and Effects" onClick={() => onSelectOpenedPanel(OptionPanels.EFFECTS)}>
        <EffectSettingIcon />
      </OptionButtonTooltip>
      <OptionButtonTooltip $text="Stats" onClick={() => onSelectOpenedPanel(OptionPanels.STATS)}>
        <StatsIcon />
      </OptionButtonTooltip>
    </Container>
  )
}