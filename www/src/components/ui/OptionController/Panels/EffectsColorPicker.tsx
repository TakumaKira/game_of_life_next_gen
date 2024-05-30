import React from 'react'
import styled from "styled-components"
import type { Color } from '@/game-of-life-next-gen'
import ColorPicker from './ColorPicker'

const Container = styled.div`
`
const Label = styled.span`
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
          onChange={value => onChange(value.color)} />
       {JSON.stringify(value)}
    </Container>
  )
}