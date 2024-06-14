import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EffectsSetting from '../EffectsSetting';
import { GL_VALUES_CONFIGURABLE_DEFAULTS } from '@/game-of-life-next-gen/constants';

// Mock the child components and dependencies
jest.mock('../../Button', () => (props: any) => <button onClick={props.onClick}>{props.children}</button>);
jest.mock('../EffectsCheckbox', () => (props: any) => <input type="checkbox" id={props.id} data-testid={props.id} checked={props.value} onChange={props.onChange} />);
jest.mock('../EffectsSlider', () => (props: any) => <input type="range" value={props.value} onChange={(e) => props.onChange(parseFloat(e.target.value))} />);
jest.mock('../EffectsColorPicker', () => (props: any) => <input type="color" data-testid={props.id} value={props.value} onChange={(e) => props.onChange(e.target.value)} />);
jest.mock('../../IndentContainer', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('EffectsSetting', () => {
  const mockOnChange = jest.fn();
  const initialGlValues = {
    backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
    specularColor: { r: 0, g: 0, b: 1, a: 1 },
    fxaaEnabled: false,
    bloomEnabled: false,
    bloomWeight: 5,
    imageProcessingEnabled: false,
    toneMappingEnabled: false,
    vignetteEnabled: false,
    vignetteMultiply: false,
    vignetteColor: { r: 1, g: 0, b: 0, a: 1 },
    vignetteWeight: 50,
    colorCurvesEnabled: false,
    contrast: 1,
    exposure: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    const { getByTestId, getByDisplayValue } = render(<EffectsSetting glValuesConfigurable={initialGlValues} onChangeGlValuesConfigurable={mockOnChange} />);
    expect(getByTestId('fxaaEnabled')).toBeInTheDocument();
    expect(getByTestId('bloomEnabled')).toBeInTheDocument();
    expect(getByDisplayValue('5')).toBeInTheDocument(); // Vignette
    expect(getByTestId('imageProcessingEnabled')).toBeInTheDocument();
    expect(getByTestId('toneMappingEnabled')).toBeInTheDocument();
    expect(getByTestId('vignetteEnabled')).toBeInTheDocument();
    expect(getByTestId('vignetteMultiply')).toBeInTheDocument();
    expect(getByTestId('vignetteColor')).toBeInTheDocument();
    expect(getByDisplayValue('50')).toBeInTheDocument(); // Vignette Weight
    expect(getByTestId('colorCurvesEnabled')).toBeInTheDocument();
    expect(getByDisplayValue('1')).toBeInTheDocument(); // Camera Contrast
    expect(getByDisplayValue('2')).toBeInTheDocument(); // Camera Exposure
  });

  it('calls onChangeGlValuesConfigurable with the correct value when a checkbox is changed', () => {
    const { getByTestId } = render(<EffectsSetting glValuesConfigurable={initialGlValues} onChangeGlValuesConfigurable={mockOnChange} />);
    expect(mockOnChange).not.toHaveBeenCalled();
    fireEvent.click(getByTestId('fxaaEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ fxaaEnabled: true });
    fireEvent.click(getByTestId('bloomEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ bloomEnabled: true });
    fireEvent.click(getByTestId('imageProcessingEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ imageProcessingEnabled: true });
    fireEvent.click(getByTestId('toneMappingEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ toneMappingEnabled: true });
    fireEvent.click(getByTestId('vignetteEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ vignetteEnabled: true });
    fireEvent.click(getByTestId('vignetteMultiply'));
    expect(mockOnChange).toHaveBeenCalledWith({ vignetteMultiply: true });
    fireEvent.click(getByTestId('colorCurvesEnabled'));
    expect(mockOnChange).toHaveBeenCalledWith({ colorCurvesEnabled: true });
  });

  it('calls onChangeGlValuesConfigurable with the correct value when a slider value changes', () => {
    const { getByDisplayValue } = render(<EffectsSetting glValuesConfigurable={initialGlValues} onChangeGlValuesConfigurable={mockOnChange} />);
    fireEvent.change(getByDisplayValue('5'), { target: { value: '10' } }); // Vignette
    expect(mockOnChange).toHaveBeenCalledWith({ bloomWeight: 10 });
    fireEvent.change(getByDisplayValue('50'), { target: { value: '100' } }); // Vignette Weight
    expect(mockOnChange).toHaveBeenCalledWith({ vignetteWeight: 100 });
    fireEvent.change(getByDisplayValue('1'), { target: { value: '2' } }); // Camera Contrast
    expect(mockOnChange).toHaveBeenCalledWith({ contrast: 2 });
    fireEvent.change(getByDisplayValue('2'), { target: { value: '4' } }); // Camera Exposure
    expect(mockOnChange).toHaveBeenCalledWith({ exposure: 4 });
  });

  it('calls onChangeGlValueConfigurable with the correct value when color picker value changes', () => {
    const { getByTestId } = render(<EffectsSetting glValuesConfigurable={initialGlValues} onChangeGlValuesConfigurable={mockOnChange} />);
    fireEvent.change(getByTestId('vignetteColor'), { target: { value: '#00ff00' } });
    expect(mockOnChange).toHaveBeenCalledWith({ vignetteColor: '#00ff00' });
  });

  it('calls onChangeGlValuesConfigurable with defaults when the reset button is clicked', () => {
    const { getByText } = render(<EffectsSetting glValuesConfigurable={initialGlValues} onChangeGlValuesConfigurable={mockOnChange} />);
    const button = getByText('Reset Effects');
    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith(GL_VALUES_CONFIGURABLE_DEFAULTS);
  });
});
