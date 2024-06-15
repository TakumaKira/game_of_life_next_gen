import React from 'react'
import styled from 'styled-components';
import CheckboxBase from '../CheckboxBase'
import IconBase from '@/components/IconBase';
import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from '@/components/SVG';

const Text = styled.span<{ $size: number }>`
  font-size: ${props => props.$size}px;
`
const CheckboxCheckedIcon = IconBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = IconBase(CheckboxUncheckedSVG)
const labelStyle: React.CSSProperties = {
  gap: '28px',
}

export default function UseJSVersionSetter({
  useJSVersion,
  onChangeUseJSVersion
}: {
  useJSVersion: boolean
  onChangeUseJSVersion: (useJSVersion: boolean) => void
}) {
  return (
    <CheckboxBase
      id="show-fps"
      checked={useJSVersion}
      onChange={e => onChangeUseJSVersion(e.target.checked)}
      label={
        <Text $size={22}>Use JavaScript version</Text>
      }
      labelPosition="before"
      checkedIcon={<CheckboxCheckedIcon $size={36} />}
      uncheckedIcon={<CheckboxUncheckedIcon $size={36} />}
      labelStyle={labelStyle}
      color="#ffffff55"
      hoverColor="#ffffff88"
    />
  )
}