import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: inline-block;
`
const Input = styled.input`
  display: none;
`
const Label = styled.label<{ color: React.CSSProperties['color'], hoverColor: React.CSSProperties['color'] }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.color};
  svg {
    fill: ${props => props.color};
  }
  &:hover {
    color: ${props => props.hoverColor};
    svg {
      fill: ${props => props.hoverColor};
    }
  }
`

export default function CheckboxBase({
  id,
  checked,
  onChange,
  label,
  labelPosition,
  checkedIcon,
  uncheckedIcon,
  containerStyle,
  labelStyle,
  color,
  hoverColor,
}: {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: React.ReactNode
  labelPosition: "before" | "after"
  checkedIcon: React.ReactNode
  uncheckedIcon: React.ReactNode
  containerStyle?: React.CSSProperties
  labelStyle: React.CSSProperties
  color: React.CSSProperties['color']
  hoverColor: React.CSSProperties['color']
}) {
  return (
    <Container style={containerStyle}>
      <Input id={id} type='checkbox' checked={checked} onChange={onChange} />
      <Label htmlFor={id} style={{...labelStyle}} color={color} hoverColor={hoverColor}>
        {labelPosition === "before" && label}
        {checked
          ? checkedIcon
          : uncheckedIcon
        }
        {labelPosition === "after" && label}
      </Label>
    </Container>
  )
}