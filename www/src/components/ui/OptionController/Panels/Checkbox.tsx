import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from "@/components/SVG"
import React from "react"
import styled from "styled-components"
import CheckboxButtonBase from "./CheckboxButtonBase"

const Container = styled.div`
  display: inline-block;
`
const Input = styled.input`
  display: none;
`
const Label = styled.label`
  width: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Play';
  font-size: 20px;
  color: #ffffff55;
  svg {
    fill: #ffffff55;
  }
  &:hover {
    color: #ffffff77;
    svg {
      fill: #ffffff77;
    }
  }
  cursor: pointer;
`
const CheckboxCheckedIcon = CheckboxButtonBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = CheckboxButtonBase(CheckboxUncheckedSVG)
const Text = styled.span`
  line-height: 20px;
`

const identify = (id: string) => `active-cell-base-option-${id}`

export default function Checkbox({ id, label, checked, onChange }: {id: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <Container key={id}>
      <Input id={identify(id)} type='checkbox' checked={checked} onChange={onChange} />
      <Label htmlFor={identify(id)}>
        {checked
          ? <CheckboxCheckedIcon />
          : <CheckboxUncheckedIcon />
        }
        <Text>
          {label}
        </Text>
      </Label>
    </Container>
  )
}
