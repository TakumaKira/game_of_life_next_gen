import React from 'react';
import styled from 'styled-components';
import CheckboxBase from '../CheckboxBase';
import { CheckboxCheckedSVG, CheckboxUncheckedSVG } from '@/components/SVG';
import IconBase from '../../../../IconBase';
import Scrollable from '../Scrollable';

export const TITLE = 'Stats';

export const WIDTH = 480;

const Container = styled.div`
  height: 100%; // For Scrollable to work
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ScrollableContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 18px;
  padding-bottom: 48px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Text = styled.span<{ $size: number }>`
  font-size: ${props => props.$size}px;
`
const CheckboxCheckedIcon = IconBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = IconBase(CheckboxUncheckedSVG)
const checkboxContainerStyle: React.CSSProperties = {
  width: '100%',
}
const labelStyle: React.CSSProperties = {
  justifyContent: 'space-between',
}

export default function StatsPanel({
  showFPS,
  onChangeShowFPS,
  showWasmLogOnNextFrame,
  onChangeShowWasmLogOnNextFrame,
}: {
  showFPS: boolean
  onChangeShowFPS: (showFPS: boolean) => void
  showWasmLogOnNextFrame: boolean
  onChangeShowWasmLogOnNextFrame: (showWasmLogOnNextFrame: boolean) => void
}) {
  return (
    <Container>
      <Scrollable>
        <ScrollableContents>
          <CheckboxBase
            id="show-fps"
            checked={showFPS}
            onChange={e => onChangeShowFPS(e.target.checked)}
            label={
              <Text $size={22}>Show Frames per Second</Text>
            }
            labelPosition="before"
            checkedIcon={<CheckboxCheckedIcon $size={36} />}
            uncheckedIcon={<CheckboxUncheckedIcon $size={36} />}
            containerStyle={checkboxContainerStyle}
            labelStyle={labelStyle}
            color="#ffffff55"
            hoverColor="#ffffff88"
          />
          <CheckboxBase
            id="show-wasm-log-on-next-frame"
            checked={showWasmLogOnNextFrame}
            onChange={e => onChangeShowWasmLogOnNextFrame(e.target.checked)}
            label={
              <TextContainer>
                <Text $size={20}>Show console.log from WASM</Text>
                <Text $size={20}>on clicking Next Frame</Text>
              </TextContainer>
            }
            labelPosition="before"
            checkedIcon={<CheckboxCheckedIcon $size={36} />}
            uncheckedIcon={<CheckboxUncheckedIcon $size={36} />}
            containerStyle={checkboxContainerStyle}
            labelStyle={labelStyle}
            color="#ffffff55"
            hoverColor="#ffffff88"
          />
        </ScrollableContents>
      </Scrollable>
    </Container>
  )
}