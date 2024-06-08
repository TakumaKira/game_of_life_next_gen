import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
`
const Label = styled.span`
  display: inline-block;
  width: 135px;
  text-align: right;
`
const Value = styled.span`
  font-weight: bold;
  display: inline-block;
  width: 40px;
  text-align: right;
`

export default function Data({
  label,
  value,
}: {
  label: string,
  value: number,
}) {
  return (
    <Container>
      <Label>{label} :</Label>
      <Value>{Math.round(value)}</Value>
    </Container>
  )
}