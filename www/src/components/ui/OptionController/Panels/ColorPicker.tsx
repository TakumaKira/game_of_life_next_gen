import React from 'react';
import styled from 'styled-components';
import iro from '@jaames/iro';
import type { IroColorPicker } from '@jaames/iro/dist/ColorPicker';
import { Color } from '@/game-of-life-next-gen';

const Picker = styled.div`
`

export default function ColorPicker({
  value,
  onChange,
}: {
  value: { color: Color } | { hex8String: string }
  onChange: (value: { color: Color, hex8String: string }) => void
}) {
  const [colorPicker, setColorPicker] = React.useState<IroColorPicker>()
  const onColorChange = React.useCallback((color: IroColorPicker['color']) => {
    onChange({ color: { r: color.red, g: color.green, b: color.blue, a: color.alpha }, hex8String: color.hex8String })
  }, [onChange])
  React.useEffect(() => {
    if (!colorPicker) {
      const _colorPicker = iro.ColorPicker('#color-picker', {
        layout: [
          {
            component: iro.ui.Wheel,
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'value',
            },
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'alpha',
            },
          },
        ],
        width: 200,
      })
      Array.from(_colorPicker.el.getElementsByClassName('IroSlider'))
        .forEach(slider => {
          (slider as HTMLDivElement).style.height = '20px' // default 28px
          Array.from(slider.getElementsByClassName('IroHandle'))
            .forEach(handle => {
              (handle as HTMLDivElement).style.top = '-12px' // default -8px
            })
        })
      if ('color' in value) {
        _colorPicker.color.red = value.color.r
        _colorPicker.color.green = value.color.g
        _colorPicker.color.blue = value.color.b
        _colorPicker.color.alpha = value.color.a
      } else {
        _colorPicker.color.hex8String = value.hex8String
      }
      setColorPicker(_colorPicker)
    }
    colorPicker?.on('color:change', onColorChange)
    return () => colorPicker?.off('color:change', onColorChange)
  }, [onColorChange])
  React.useEffect(() => {
    if (!colorPicker) {
      return
    }
    if ('color' in value) {
      colorPicker.color.red = value.color.r
      colorPicker.color.green = value.color.g
      colorPicker.color.blue = value.color.b
      colorPicker.color.alpha = value.color.a
    } else {
      colorPicker.color.hex8String = value.hex8String
    }
  }, [value])
  return (
    <Picker id="color-picker"></Picker>
  )
}