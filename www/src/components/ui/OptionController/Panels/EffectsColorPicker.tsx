import type { Color } from '@/game-of-life-next-gen'
import React from 'react'

export default function EffectsColorPicker({
  label,
  indent,
  value,
  onChange,
}: {
  label: string
  indent: number
  value: Color
  onChange: (value: Color) => void
}) {
  return (
    <p>{label} {indent} {JSON.stringify(value)}</p>
  )
}