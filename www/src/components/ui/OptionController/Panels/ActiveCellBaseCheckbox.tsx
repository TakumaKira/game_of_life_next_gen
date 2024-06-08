import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from "@/components/SVG"
import React from "react"
import styled from "styled-components"
import IconBase from "../../../IconBase"
import CheckboxBase from "./CheckboxBase"

const labelStyle: React.CSSProperties = {
  width: '52px',
  justifyContent: 'space-between',
  fontFamily: 'Play',
  fontSize: '20px',
}
const CheckboxCheckedIcon = IconBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = IconBase(CheckboxUncheckedSVG)
const Text = styled.span`
  line-height: 20px;
`

const identify = (id: string) => `active-cell-base-option-${id}`

export default function ActiveCellBaseCheckbox({ id, label, checked, onChange }: {id: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <CheckboxBase
      id={identify(id)}
      checked={checked}
      onChange={onChange}
      label={<Text>{label}</Text>}
      labelPosition="after"
      checkedIcon={<CheckboxCheckedIcon $size={24} />}
      uncheckedIcon={<CheckboxUncheckedIcon $size={24} />}
      labelStyle={labelStyle}
      color="#ffffff55"
      hoverColor="#ffffff88"
    />
  )
}
