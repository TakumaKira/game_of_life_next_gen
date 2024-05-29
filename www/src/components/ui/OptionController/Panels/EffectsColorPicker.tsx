import type { Color } from '@/game-of-life-next-gen'
import React from 'react'

export default function EffectsColorPicker({
  label,
  value,
  onChange,
}: {
  label: string
  value: Color
  onChange: (value: Color) => void
}) {
  return (
    <p>{label} {JSON.stringify(value)}</p>
  )
}