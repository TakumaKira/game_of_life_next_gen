import { RadioCheckedSVG, RadioUncheckedSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import IconBase from '../IconBase';

const DEFAULT_COLOR = '#ffffff66'
const HOVER_COLOR = '#ffffffaa'
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  color: ${DEFAULT_COLOR};
  svg {
    fill: ${DEFAULT_COLOR};
  }
  &:hover {
    color: ${HOVER_COLOR};
    svg {
      fill: ${HOVER_COLOR};
    }
  }
`
const FONT_SIZE = '20px'
const Label = styled.span`
  font-size: ${FONT_SIZE};
  line-height: ${FONT_SIZE};
`

const RadioCheckedIcon = IconBase(RadioCheckedSVG)
const RadioUncheckedIcon = IconBase(RadioUncheckedSVG)

export default function RadioOption({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <Container onClick={onClick}>
      {selected
        ? <RadioCheckedIcon />
        : <RadioUncheckedIcon />
      }
      <Label>{label}</Label>
    </Container>
  )
}