import React from 'react'
import styled from 'styled-components';
import CheckboxBase from '../CheckboxBase';
import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from '@/components/SVG';
import IconBase from '../../../../IconBase';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Text = styled.span`
  font-size: 22px;
`
const CheckboxCheckedIcon = IconBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = IconBase(CheckboxUncheckedSVG)
const labelStyle: React.CSSProperties = {
  gap: '28px',
}

export default function AutoStartSetter({
  autoStartOnChangeGameRules,
  onChangeAutoStartOnChangeGameRules,
}: {
  autoStartOnChangeGameRules: boolean
  onChangeAutoStartOnChangeGameRules: (autoStartOnChangeGameRules: boolean) => void
}) {
  return (
    <CheckboxBase
      id="auto-start-on-change-game-rules"
      checked={autoStartOnChangeGameRules}
      onChange={e => onChangeAutoStartOnChangeGameRules(e.target.checked)}
      label={
        <TextContainer>
          <Text>Changing game rules restarts the game.</Text>
          <Text>Do you want to prevent autoplay?</Text>
        </TextContainer>
      }
      labelPosition="before"
      checkedIcon={<CheckboxCheckedIcon $size={36} />}
      uncheckedIcon={<CheckboxUncheckedIcon $size={36} />}
      labelStyle={labelStyle}
      color="#ffffff55"
      hoverColor="#ffffff88"
    />
  )
}