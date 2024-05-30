import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import type { GLValuesConfigurable } from '@/game-of-life-next-gen';
import EffectsCheckbox from './EffectsCheckbox';
import EffectsSlider from './EffectsSlider';
import EffectsColorPicker from './EffectsColorPicker';
import { BLOOM_WEIGHT_MAX, BLOOM_WEIGHT_MIN, CAMERA_CONTRAST_MAX, CAMERA_CONTRAST_MIN, CAMERA_EXPOSURE_MAX, CAMERA_EXPOSURE_MIN, VIGNETTE_WEIGHT_MAX, VIGNETTE_WEIGHT_MIN } from '@/game-of-life-next-gen/constants';
import EffectsInputContainer from './EffectsInputContainer';

const Container = styled.div`
`;
const Upper = styled.div`
`
const Lower = styled.div`
`

export default function EffectsSetting({
  glValuesConfigurable,
  onChangeGlValuesConfigurable,
}: {
  glValuesConfigurable: GLValuesConfigurable
  onChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void
}) {
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGlValuesConfigurable({ [e.target.id]: e.target.checked })
  }
  const onClickReset = () => {
    onChangeGlValuesConfigurable({ backgroundColor: { r: 255, g: 255, b: 255, a: 1 } })
  }
  return (
    <Container>
      <Upper>
        <EffectsInputContainer $indent={0}>
          <EffectsCheckbox
            id="fxaaEnabled"
            label="FXAA"
            value={glValuesConfigurable.fxaaEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={0}>
          <EffectsCheckbox
            id="bloomEnabled"
            label="Bloom"
            value={glValuesConfigurable.bloomEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsSlider
            label="Bloom Weight"
            value={glValuesConfigurable.bloomWeight}
            range={[BLOOM_WEIGHT_MIN, BLOOM_WEIGHT_MAX]}
            onChange={v => console.log(v)}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={0}>
          <EffectsCheckbox
            id="imageProcessingEnabled"
            label="Image Processing"
            value={glValuesConfigurable.imageProcessingEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsCheckbox
            id="toneMappingEnabled"
            label="Tone Mapping"
            value={glValuesConfigurable.toneMappingEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsCheckbox
            id="vignetteEnabled"
            label="Vignette"
            value={glValuesConfigurable.vignetteEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={2}>
          <EffectsCheckbox
            id="vignetteMultiply"
            label="Vignette Multiply"
            value={glValuesConfigurable.vignetteMultiply}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={2}>
          <EffectsColorPicker
            id="vignetteColor"
            label="Vignette Color"
            value={glValuesConfigurable.vignetteColor}
            onChange={v => console.log(JSON.stringify(v))}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={2}>
          <EffectsSlider
            label="Vignette Weight"
            value={glValuesConfigurable.vignetteWeight}
            range={[VIGNETTE_WEIGHT_MIN, VIGNETTE_WEIGHT_MAX]}
            onChange={v => console.log(v)}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsCheckbox
            id="colorCurvesEnabled"
            label="Color Curves"
            value={glValuesConfigurable.colorCurvesEnabled}
            onChange={onChangeCheckbox}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsSlider
            label="Camera Contrast"
            value={glValuesConfigurable.contrast}
            range={[CAMERA_CONTRAST_MIN, CAMERA_CONTRAST_MAX]}
            onChange={v => console.log(v)}
          />
        </EffectsInputContainer>
        <EffectsInputContainer $indent={1}>
          <EffectsSlider
            label="Camera Exposure"
            value={glValuesConfigurable.exposure}
            range={[CAMERA_EXPOSURE_MIN, CAMERA_EXPOSURE_MAX]}
            onChange={v => console.log(v)}
          />
        </EffectsInputContainer>
      </Upper>
      <Lower>
        <Button onClick={onClickReset}>
          Reset Effects
        </Button>
      </Lower>
    </Container>
  )
}