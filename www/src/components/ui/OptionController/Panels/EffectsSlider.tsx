import React from 'react'

export default function EffectsSlider({
  label,
  range,
  value,
}: {
  label: string
  range: [number, number]
  value: number
  onChange: (value: number) => void
}) {
  return (
    <p>{label} {value} {JSON.stringify(range)}</p>
  )
}