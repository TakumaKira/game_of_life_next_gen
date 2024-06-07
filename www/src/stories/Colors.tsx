import React from 'react';
import styled from 'styled-components';
import Fonts from '../components/Fonts';
import Drawer from '../components/ui/OptionController/Drawer';
import PlayControllerButtonTooltip from '@/components/ui/PlayController/PlayControllerButtonTooltip';
import PlayControllerButtonBase from '@/components/ui/PlayController/PlayControllerButtonBase';
import { CameraResetSVG, EffectSettingSVG } from '@/components/SVG';
import OptionButtonTooltip from '@/components/ui/OptionController/OptionButtonTooltip';
import OptionButtonBase from '@/components/ui/OptionController/OptionButtonBase';
import FPSDisplay from '@/components/ui/FPSDisplay';

const Container = styled.div<{ backgroundColor: string }>`
  height: 100vh;
  background-color: ${props => props.backgroundColor};
`

const BottomContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
`
const CameraResetIcon = PlayControllerButtonBase(CameraResetSVG)

const LeftContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 400px;
`
const EffectSettingIcon = OptionButtonBase(EffectSettingSVG)

export default function Colors({ backgroundColor }: { backgroundColor: string }) {
  return (
    <>
      <Fonts />
      <Container backgroundColor={backgroundColor}>
        <BottomContainer>
          <PlayControllerButtonTooltip $text="Reset Camera" onClick={() => {}}>
            <CameraResetIcon size={36} />
          </PlayControllerButtonTooltip>
        </BottomContainer>
        <LeftContainer>
          <OptionButtonTooltip $text="Colors and Effects" onClick={() => {}}>
            <EffectSettingIcon />
          </OptionButtonTooltip>
        </LeftContainer>
        <FPSDisplay fpsData={{ fps: 60, mean: 60, min: 60, max: 60 }} />
        <Drawer title="Colors" width={600} onClose={() => {}}>
          <div>Colors</div>
        </Drawer>
      </Container>
    </>
  )
}