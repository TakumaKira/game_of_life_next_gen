import React from 'react'

export default function EffectsSlider({
  label,
  indent,
  range,
  value,
}: {
  label: string
  indent: number
  range: [number, number]
  value: number
  onChange: (value: number) => void
}) {
  return (
    <p>{label} {indent} {value} {JSON.stringify(range)}</p>
  )
}