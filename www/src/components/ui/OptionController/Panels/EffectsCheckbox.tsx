import React from 'react'
import styled from "styled-components"
import CheckboxBase from './CheckboxBase'
import IconBase from './IconBase'
import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from '@/components/SVG'

const labelStyle: React.CSSProperties = {
  fontFamily: 'Play',
  fontSize: '20px',
}
const CheckboxCheckedIcon = IconBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = IconBase(CheckboxUncheckedSVG)
const Text = styled.span`
  line-height: 20px;
`

export default function EffectsCheckbox({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <CheckboxBase
      id={id}
      checked={value}
      onChange={onChange}
      label={<Text>{label}</Text>}
      labelPosition="after"
      checkedIcon={<CheckboxCheckedIcon />}
      uncheckedIcon={<CheckboxUncheckedIcon />}
      labelStyle={labelStyle}
      color="#ffffff55"
      hoverColor="#ffffff88"
    />
  )
}