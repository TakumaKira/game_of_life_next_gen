import React from 'react'
import styled from "styled-components"
import type { Color } from '@/game-of-life-next-gen'
import ColorPicker from '../ColorPicker'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
`
const Label = styled.span`
  font-size: 20px;
  color: #ffffff55;
`

export default function EffectsColorPicker({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: Color
  onChange: (value: Color) => void
}) {
  return (
    <Container>
      <Label>
        {label}
      </Label>
        <ColorPicker
          id={id}
          value={{ color: value }}
          onChange={value => onChange(value.color)}
        />
    </Container>
  )
}