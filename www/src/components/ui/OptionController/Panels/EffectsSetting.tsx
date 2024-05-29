import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import type { GLValuesConfigurable } from '@/game-of-life-next-gen';
import EffectsCheckbox from './EffectsCheckbox';
import EffectsSlider from './EffectsSlider';
import EffectsColorPicker from './EffectsColorPicker';
import { BLOOM_WEIGHT_MAX, BLOOM_WEIGHT_MIN, CAMERA_CONTRAST_MAX, CAMERA_CONTRAST_MIN, CAMERA_EXPOSURE_MAX, CAMERA_EXPOSURE_MIN, VIGNETTE_WEIGHT_MAX, VIGNETTE_WEIGHT_MIN } from '@/game-of-life-next-gen/constants';

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
  const onClickReset = () => {
    onChangeGlValuesConfigurable({ backgroundColor: { r: 255, g: 255, b: 255, a: 1 } })
  }
  return (
    <Container>
      <Upper>
        <EffectsCheckbox
          label="FXAA"
          indent={0}
          value={glValuesConfigurable.fxaaEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsCheckbox
          label="Bloom"
          indent={0}
          value={glValuesConfigurable.bloomEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsSlider
          label="Bloom Weight"
          indent={1}
          value={glValuesConfigurable.bloomWeight}
          range={[BLOOM_WEIGHT_MIN, BLOOM_WEIGHT_MAX]}
          onChange={v => console.log(v)}
        />
        <EffectsCheckbox
          label="Image Processing"
          indent={0}
          value={glValuesConfigurable.imageProcessingEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsCheckbox
          label="Tone Mapping"
          indent={1}
          value={glValuesConfigurable.toneMappingEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsCheckbox
          label="Vignette"
          indent={1}
          value={glValuesConfigurable.vignetteEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsCheckbox
          label="Vignette Multiply"
          indent={2}
          value={glValuesConfigurable.vignetteMultiply}
          onChange={v => console.log(v.toString())}
        />
        <EffectsColorPicker label="Vignette Color"
          indent={2}
          value={glValuesConfigurable.vignetteColor}
          onChange={v => console.log(JSON.stringify(v))}
        />
        <EffectsSlider
          label="Vignette Weight"
          indent={2}
          value={glValuesConfigurable.vignetteWeight}
          range={[VIGNETTE_WEIGHT_MIN, VIGNETTE_WEIGHT_MAX]}
          onChange={v => console.log(v)}
        />
        <EffectsCheckbox
          label="Color Curves"
          indent={1}
          value={glValuesConfigurable.colorCurvesEnabled}
          onChange={v => console.log(v.toString())}
        />
        <EffectsSlider
          label="Camera Contrast"
          indent={1}
          value={glValuesConfigurable.contrast}
          range={[CAMERA_CONTRAST_MIN, CAMERA_CONTRAST_MAX]}
          onChange={v => console.log(v)}
        />
        <EffectsSlider
          label="Camera Exposure"
          indent={1}
          value={glValuesConfigurable.exposure}
          range={[CAMERA_EXPOSURE_MIN, CAMERA_EXPOSURE_MAX]}
          onChange={v => console.log(v)}
        />
      </Upper>
      <Lower>
        <Button onClick={onClickReset}>
          Reset Effects
        </Button>
      </Lower>
    </Container>
  )
}