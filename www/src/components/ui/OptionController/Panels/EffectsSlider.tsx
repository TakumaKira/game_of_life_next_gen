import React from 'react'
import styled from "styled-components"
import Slider from './Slider'

const Container = styled.div`
`
const Label = styled.span`
  font-size: 20px;
  color: #ffffff55;
`

export default function EffectsSlider({
  label,
  range,
  value,
  onChange,
}: {
  label: string
  range: [number, number]
  value: number
  onChange: (value: number) => void
}) {
  return (
    <Container>
      <Label>
        {label}
      </Label>
      <Slider range={range} value={value} onChange={onChange} />
    </Container>
  )
}