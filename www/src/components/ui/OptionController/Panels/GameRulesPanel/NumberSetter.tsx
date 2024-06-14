import React from 'react'
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const TextContainer = styled.div`
  width: 225px;
  color: #ffffff77;
  font-size: 21px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const Text = styled.span`
`
const numberTypography: React.CSSProperties = {
  fontSize: '26px',
}

export default function NumberSetter({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  const onClickButton = () => {
    const input = prompt(`Enter New ${label}`, value.toString())
    if (input === null) {
      return
    }
    const newInput = parseInt(input)
    if (isNaN(newInput)) {
      return
    }
    onChange(newInput)
  }
  return (
    <Container>
      <TextContainer>
        <Text style={{ marginBottom: 2 }}>Current {label}:</Text>
        <Text style={{...numberTypography}}>{value.toLocaleString()}</Text>
      </TextContainer>
      <Button onClick={onClickButton}>Change {label}</Button>
    </Container>
  )
}