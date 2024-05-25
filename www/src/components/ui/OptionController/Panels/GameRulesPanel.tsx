import React from 'react';
import styled from 'styled-components';
import NumberSetters from './NumberSetters';
import AliveCellBaseSetter from './AliveCellBaseSetter';
import AutoStartSetter from './AutoStartSetter';

export const TITLE = 'Game Rules';

export const WIDTH = 572;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

export default function GameRulesPanel({
  fieldSize,
  onChangeFieldSize,
  lifespan,
  onChangeLifespan,
  speed,
  onChangeSpeed,
  aliveCellBaseOptions,
  aliveCellBase,
  onChangeAliveCellBase,
  autoStartOnChangeGameRules,
  onChangeAutoStartOnChangeGameRules,
}: {
  fieldSize: number
  onChangeFieldSize: (fieldSize: number) => void
  lifespan: number
  onChangeLifespan: (lifespan: number) => void
  speed: number
  onChangeSpeed: (speed: number) => void
  aliveCellBaseOptions: number[]
  aliveCellBase: { [number: number]: boolean }
  onChangeAliveCellBase: (aliveCellBase: { [number: number]: boolean }) => void
  autoStartOnChangeGameRules: boolean
  onChangeAutoStartOnChangeGameRules: (autoStartOnChangeGameRules: boolean) => void
}) {
  return (
    <Container>
      <NumberSetters
        fieldSize={fieldSize}
        onChangeFieldSize={onChangeFieldSize}
        lifespan={lifespan}
        onChangeLifespan={onChangeLifespan}
        speed={speed}
        onChangeSpeed={onChangeSpeed}
      />
      <AliveCellBaseSetter
        aliveCellBaseOptions={aliveCellBaseOptions}
        aliveCellBase={aliveCellBase}
        onChangeAliveCellBase={onChangeAliveCellBase}
      />
      <AutoStartSetter
        autoStartOnChangeGameRules={autoStartOnChangeGameRules}
        onChangeAutoStartOnChangeGameRules={onChangeAutoStartOnChangeGameRules}
      />
    </Container>
  )
}