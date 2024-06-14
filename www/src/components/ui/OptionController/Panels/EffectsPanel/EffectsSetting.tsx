import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import type { Color, GLValuesConfigurable } from '@/game-of-life-next-gen';
import EffectsCheckbox from './EffectsCheckbox';
import EffectsSlider from './EffectsSlider';
import EffectsColorPicker from './EffectsColorPicker';
import { BLOOM_WEIGHT_MAX, BLOOM_WEIGHT_MIN, CAMERA_CONTRAST_MAX, CAMERA_CONTRAST_MIN, CAMERA_EXPOSURE_MAX, CAMERA_EXPOSURE_MIN, GL_VALUES_CONFIGURABLE_DEFAULTS, VIGNETTE_WEIGHT_MAX, VIGNETTE_WEIGHT_MIN } from '@/game-of-life-next-gen/constants';
import IndentContainer from '../IndentContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  user-select: none;
`
const Lower = styled.div`
  display: flex;
  flex-direction: column;
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
  const onChangeSlider = (key: string, value: number) => {
    onChangeGlValuesConfigurable({ [key]: value })
  }
  const onChangeColorPicker = (key: string, value: Color) => {
    onChangeGlValuesConfigurable({ [key]: value })
  }
  const onClickReset = () => {
    onChangeGlValuesConfigurable(GL_VALUES_CONFIGURABLE_DEFAULTS)
  }
  return (
    <Container>
      <Upper>
        <IndentContainer $indent={0}>
          <EffectsCheckbox
            id="fxaaEnabled"
            label="FXAA"
            value={glValuesConfigurable.fxaaEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={0}>
          <EffectsCheckbox
            id="bloomEnabled"
            label="Bloom"
            value={glValuesConfigurable.bloomEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsSlider
            label="Bloom Weight"
            value={glValuesConfigurable.bloomWeight}
            range={[BLOOM_WEIGHT_MIN, BLOOM_WEIGHT_MAX]}
            onChange={v => onChangeSlider('bloomWeight', v)}
          />
        </IndentContainer>
        <IndentContainer $indent={0}>
          <EffectsCheckbox
            id="imageProcessingEnabled"
            label="Image Processing"
            value={glValuesConfigurable.imageProcessingEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsCheckbox
            id="toneMappingEnabled"
            label="Tone Mapping"
            value={glValuesConfigurable.toneMappingEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsCheckbox
            id="vignetteEnabled"
            label="Vignette"
            value={glValuesConfigurable.vignetteEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={2}>
          <EffectsCheckbox
            id="vignetteMultiply"
            label="Vignette Multiply"
            value={glValuesConfigurable.vignetteMultiply}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={2}>
          <EffectsColorPicker
            id="vignetteColor"
            label="Vignette Color"
            value={glValuesConfigurable.vignetteColor}
            onChange={v => onChangeColorPicker('vignetteColor', v)}
          />
        </IndentContainer>
        <IndentContainer $indent={2}>
          <EffectsSlider
            label="Vignette Weight"
            value={glValuesConfigurable.vignetteWeight}
            range={[VIGNETTE_WEIGHT_MIN, VIGNETTE_WEIGHT_MAX]}
            onChange={v => onChangeSlider('vignetteWeight', v)}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsCheckbox
            id="colorCurvesEnabled"
            label="Color Curves"
            value={glValuesConfigurable.colorCurvesEnabled}
            onChange={onChangeCheckbox}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsSlider
            label="Camera Contrast"
            value={glValuesConfigurable.contrast}
            range={[CAMERA_CONTRAST_MIN, CAMERA_CONTRAST_MAX]}
            onChange={v => onChangeSlider('contrast', v)}
          />
        </IndentContainer>
        <IndentContainer $indent={1}>
          <EffectsSlider
            label="Camera Exposure"
            value={glValuesConfigurable.exposure}
            range={[CAMERA_EXPOSURE_MIN, CAMERA_EXPOSURE_MAX]}
            onChange={v => onChangeSlider('exposure', v)}
          />
        </IndentContainer>
      </Upper>
      <Lower>
        <Button onClick={onClickReset} $width={180} $height={28} style={{ alignSelf: 'center' }}>
          Reset Effects
        </Button>
      </Lower>
    </Container>
  )
}