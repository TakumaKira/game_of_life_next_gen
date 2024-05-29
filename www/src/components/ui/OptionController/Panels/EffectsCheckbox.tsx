import React from 'react'

export default function EffectsCheckbox({
  label,
  indent,
  value,
  onChange,
}: {
  label: string
  indent: number
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <p>{label} {indent} {value.toString()}</p>
  )
}