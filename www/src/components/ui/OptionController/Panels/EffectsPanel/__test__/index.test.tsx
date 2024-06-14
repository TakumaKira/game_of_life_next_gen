import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EffectsPanel from '../index';
import ColorsSetting from '../ColorsSetting';
import EffectsSetting from '../EffectsSetting';
import type { GLValuesConfigurable, TextureColors } from '@/game-of-life-next-gen';

// Mock the styled components and local dependencies
jest.mock('../ColorsSetting', () => {
  return jest.fn(({ onChangeTextureColors, onChangeGlValuesConfigurable }) =>
    <div data-testid="colors-setting">
      <button data-testid="colors-gl-texture-colors" onClick={onChangeTextureColors}></button>
      <button data-testid="colors-gl-values-configurable" onClick={onChangeGlValuesConfigurable}></button>
    </div>
  );
});
jest.mock('../EffectsSetting', () => {
  return jest.fn(({ onChangeGlValuesConfigurable }) =>
    <div data-testid="effects-setting">
      <button data-testid="effects-gl-values-configurable" onClick={onChangeGlValuesConfigurable}></button>
    </div>
  );
});
jest.mock('../../Scrollable', () => {
  return jest.fn(({ children }) => <div data-testid="scrollable">{children}</div>);
});

describe('EffectsPanel', () => {
  const mockOnChangeTextureColors = jest.fn();
  const mockOnChangeGlValuesConfigurable = jest.fn();
  const textureColors = { gridColor: '#FFFFFF', deadColor: '#000000', aliveColors: ['#FF0000', '#00FF00', '#0000FF'] } as TextureColors;
  const glValuesConfigurable = { backgroundColor: { r: 0, g: 0, b: 0, a: 0 }, fxaaEnabled: false } as GLValuesConfigurable;

  beforeEach(() => {
    render(
      <EffectsPanel
        textureColors={textureColors}
        onChangeTextureColors={mockOnChangeTextureColors}
        glValuesConfigurable={glValuesConfigurable}
        onChangeGlValuesConfigurable={mockOnChangeGlValuesConfigurable}
      />
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('scrollable')).toBeInTheDocument();
    expect(screen.getByTestId('colors-setting')).toBeInTheDocument();
    expect(screen.getByTestId('effects-setting')).toBeInTheDocument();
  });

  it('passes correct props to ColorsSetting', () => {
    expect(ColorsSetting).toHaveBeenCalledWith(
      expect.objectContaining({
        textureColors,
        onChangeTextureColors: mockOnChangeTextureColors,
        glValuesConfigurable,
        onChangeGlValuesConfigurable: mockOnChangeGlValuesConfigurable
      }),
      {}
    );
  });

  it('passes correct props to EffectsSetting', () => {
    expect(EffectsSetting).toHaveBeenCalledWith(
      expect.objectContaining({
        glValuesConfigurable,
        onChangeGlValuesConfigurable: mockOnChangeGlValuesConfigurable
      }),
      {}
    );
  });

  it('should handle changes in ColorsSetting', () => {
    fireEvent.click(screen.getByTestId('colors-gl-texture-colors'));
    expect(mockOnChangeTextureColors).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('colors-gl-values-configurable'));
    expect(mockOnChangeGlValuesConfigurable).toHaveBeenCalled();
  });

  it('should handle changes in EffectsSetting', () => {
    fireEvent.click(screen.getByTestId('effects-gl-values-configurable'));
    expect(mockOnChangeGlValuesConfigurable).toHaveBeenCalled();
  });
});
