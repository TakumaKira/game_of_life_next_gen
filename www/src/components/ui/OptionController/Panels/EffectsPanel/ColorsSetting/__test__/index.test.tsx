import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorsSetting from '../index';
import ColorManagers, { type ColorManagerKeys } from '../ColorManagers';
import { DEFAULT_GL_COLORS, DEFAULT_TEXTURE_COLORS, keyOptions } from '../const';
import { TEXTURE_COLORS_DEFAULT } from '@/game-of-life-next-gen/constants';
import type { Color } from '@/game-of-life-next-gen';
import { RadioSelectorOption } from '../../../RadioSelector/types';

jest.mock('../../../Button', () => ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => <button onClick={onClick}>{children}</button>);
jest.mock('../../../RadioSelector', () => ({ selectedKey, options, onChange }: { selectedKey: string, options: RadioSelectorOption[], onChange: (key: string) => void }) => (
  <div role="radiogroup">
    {options.map((option) => (
      <button key={option.key} onClick={() => onChange(option.key)}>
        {option.label}
      </button>
    ))}
  </div>
));
jest.mock('../../../ColorPicker', () => ({ id, value, onChange }: { id: string, value: { color: string, hex8String: string }, onChange: (value: { color: Color, hex8String: string }) => void }) => (
  <input data-testid={id} value={value.hex8String} onChange={(e) => onChange({ color: { r: 0, g: 0, b: 0, a: 0 }, hex8String: e.target.value })} />
));

jest.mock('../ColorManagers', () => ({
  __esModule: true,
  ...jest.requireActual('../ColorManagers'),
  default: {
    backgroundColor: {
      label: 'Background',
      setPickerColor: jest.fn(),
      updateColorValue: jest.fn(),
    },
    specularColor: {
      label: 'Texture Specular',
      setPickerColor: jest.fn(),
      updateColorValue: jest.fn(),
    },
  }
}));

describe('ColorsSetting', () => {
  const mockOnChangeTextureColors = jest.fn();
  const mockOnChangeGlValuesConfigurable = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (glValuesConfigurable = DEFAULT_GL_COLORS, textureColors = TEXTURE_COLORS_DEFAULT) =>
    render(
      <ColorsSetting
        textureColors={textureColors}
        onChangeTextureColors={mockOnChangeTextureColors}
        glValuesConfigurable={glValuesConfigurable}
        onChangeGlValuesConfigurable={mockOnChangeGlValuesConfigurable}
      />
    );

  test('renders correctly with initial values', () => {
    const { getByRole, getByTestId, getByText } = setup();
    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getByTestId('color-setting-color-picker')).toBeInTheDocument();
    expect(getByText('Reset Selected Color')).toBeInTheDocument();
    expect(getByText('Reset All Colors')).toBeInTheDocument();
  });

  test('handles key change', () => {
    const { getByText } = setup();
    const selectedOption = keyOptions[1];
    fireEvent.click(getByText(selectedOption.label));
    expect(ColorManagers[selectedOption.key as ColorManagerKeys].setPickerColor).toHaveBeenCalled();
  });

  test('handles color change', () => {
    const { getByTestId } = setup();
    const newColor = '#FFFFFFFF';
    fireEvent.change(getByTestId('color-setting-color-picker'), { target: { value: newColor } });
    expect(ColorManagers.backgroundColor.updateColorValue).toHaveBeenCalledWith(expect.objectContaining({ hex8String: newColor }));
  });

  test('reset selected color', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Reset Selected Color'));
    expect(ColorManagers.backgroundColor.updateColorValue).toHaveBeenCalledWith({
      onChangeGlValuesConfigurable: mockOnChangeGlValuesConfigurable,
      onChangeTextureColors: mockOnChangeTextureColors,
      color: (DEFAULT_GL_COLORS as { [key in ColorManagerKeys]?: Color }).backgroundColor,
      hex8String: (DEFAULT_TEXTURE_COLORS as { [key in ColorManagerKeys]?: string }).backgroundColor,
    });
    expect(ColorManagers.backgroundColor.setPickerColor).toHaveBeenCalledWith(expect.objectContaining({
      glColors: DEFAULT_GL_COLORS,
      textureColors: TEXTURE_COLORS_DEFAULT,
    }))
  });

  test('reset all colors', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Reset All Colors'));
    expect(mockOnChangeGlValuesConfigurable).toHaveBeenCalledWith(DEFAULT_GL_COLORS);
    expect(mockOnChangeTextureColors).toHaveBeenCalledWith(TEXTURE_COLORS_DEFAULT);
    expect(ColorManagers.backgroundColor.setPickerColor).toHaveBeenCalledWith(expect.objectContaining({
      glColors: DEFAULT_GL_COLORS,
      textureColors: TEXTURE_COLORS_DEFAULT,
    }))
  });
});
