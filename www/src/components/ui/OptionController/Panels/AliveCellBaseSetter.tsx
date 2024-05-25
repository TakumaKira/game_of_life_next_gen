import React from 'react'
import styled from 'styled-components';
import Checkbox from './Checkbox'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const Label = styled.span`
  font-family: 'Play';
  font-size: 21px;
  color: #ffffff77;
`
const CheckboxContainer = styled.div`
  padding: 0 12px;
  display: flex;
  gap: 20px 36px;
  flex-wrap: wrap;
`

export default function AliveCellBaseSetter({
  aliveCellBaseOptions,
  aliveCellBase,
  onChangeAliveCellBase,
}: {
  aliveCellBaseOptions: number[]
  aliveCellBase: { [number: number]: boolean }
  onChangeAliveCellBase: (aliveCellBase: { [number: number]: boolean }) => void
}) {
  const _onChangeAliveCellBase = (index: number): React.ChangeEventHandler<HTMLInputElement> => e => {
    const nextAliveCellBase = {...aliveCellBase}
    nextAliveCellBase[index] = e.target.checked
    onChangeAliveCellBase(nextAliveCellBase)
  }
  return (
    <Container>
      <Label>Alive Cell Base:</Label>
      <CheckboxContainer>
        {aliveCellBaseOptions.map(number => 
          <Checkbox
            key={number.toString()}
            id={number.toString()}
            label={number.toString()}
            checked={aliveCellBase[number]}
            onChange={_onChangeAliveCellBase(number)}
          />
        )}
      </CheckboxContainer>
    </Container>
  )
}