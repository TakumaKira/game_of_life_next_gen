import { EffectSettingSVG, GameSettingSVG, StatsSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import OptionButtonBase from './OptionButtonBase';
import OptionButtonTooltip from './OptionButtonTooltip';
import { OptionPanels } from './types';

const Container = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
      <OptionButtonTooltip $text="Game Rules" $iconSize={36} onClick={() => onSelectOpenedPanel(OptionPanels.GAME_RULES)}>
        <GameSettingIcon $size={36} />
      </OptionButtonTooltip>
      <OptionButtonTooltip $text="Colors and Effects" $iconSize={36} onClick={() => onSelectOpenedPanel(OptionPanels.EFFECTS)}>
        <EffectSettingIcon $size={36} />
      </OptionButtonTooltip>
      <OptionButtonTooltip $text="Stats" $iconSize={36} onClick={() => onSelectOpenedPanel(OptionPanels.STATS)}>
        <StatsIcon $size={36} />
      </OptionButtonTooltip>
    </Container>
  )
}