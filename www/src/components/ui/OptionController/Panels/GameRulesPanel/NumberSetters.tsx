import React from 'react';
import styled from 'styled-components';
import NumberSetter from './NumberSetter';

const NumberSetterContainer = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export default function NumberSetters({
  fieldSize,
  onChangeFieldSize,
  lifespan,
  onChangeLifespan,
  speed,
  onChangeSpeed,
}: {
  fieldSize: number
  onChangeFieldSize: (fieldSize: number) => void
  lifespan: number
  onChangeLifespan: (lifespan: number) => void
  speed: number
  onChangeSpeed: (speed: number) => void
}) {
  return (
    <NumberSetterContainer>
      <NumberSetter label="Field Size" value={fieldSize} onChange={v => onChangeFieldSize(v)} />
      <NumberSetter label="Lifespan" value={lifespan} onChange={v => onChangeLifespan(v)} />
      <NumberSetter label="Speed" value={speed} onChange={v => onChangeSpeed(v)} />
    </NumberSetterContainer>
  )
}