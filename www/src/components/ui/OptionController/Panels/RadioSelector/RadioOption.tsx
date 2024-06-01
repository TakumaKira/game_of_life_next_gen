import { RadioCheckedSVG, RadioUncheckedSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import IconBase from '../IconBase';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  color: #ffffff66;
  svg {
    fill: #ffffff66;
  }
  &:hover {
    color: #ffffffaa;
    svg {
      fill: #ffffffaa;
    }
  }
`
const Label = styled.span`
  font-family: 'Play';
  font-size: 20px;
  line-height: 20px;
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