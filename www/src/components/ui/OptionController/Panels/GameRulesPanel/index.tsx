import React from 'react';
import styled from 'styled-components';
import NumberSetters from './NumberSetters';
import AliveCellBaseSetter from './AliveCellBaseSetter';
import AutoStartSetter from './AutoStartSetter';
import Scrollable from '../Scrollable';
import UseJSVersionSetter from './UseJSVersionSetter';

export const TITLE = 'Game Rules';

export const WIDTH = 572;

const Container = styled.div`
  height: 100%; // For Scrollable to work
  display: flex;
  flex-direction: column;
  gap: 56px;
`;
const ScrollableContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 18px;
  padding-bottom: 48px;
`

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
  useJSVersion,
  onChangeUseJSVersion,
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
  useJSVersion: boolean
  onChangeUseJSVersion: (useJSVersion: boolean) => void
}) {
  return (
    <Container>
      <Scrollable>
        <ScrollableContents>
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
          <UseJSVersionSetter
            useJSVersion={useJSVersion}
            onChangeUseJSVersion={onChangeUseJSVersion}
          />
        </ScrollableContents>
      </Scrollable>
    </Container>
  )
}