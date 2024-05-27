import { RadioCheckedSVG, RadioUncheckedSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import IconBase from '../IconBase';

const Container = styled.div`
`
const Label = styled.span`
  font-family: 'Play';
  color: #ffffff88;
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