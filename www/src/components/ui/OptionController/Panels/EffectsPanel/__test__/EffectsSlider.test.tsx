import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EffectsSlider from '../EffectsSlider';  // Adjust the import path as necessary

// Mock the 'Slider' component
jest.mock('../../Slider', () => ({ label, range, value, onChange }: { label: string, range: [number, number]; value: number; onChange: (value: number) => void }) => {
  return (
    <div
      data-testid="mock-slider"
      data-min={range[0]}
      data-max={range[1]}
      data-value={value.toString()}
      onClick={() => onChange(0)}
    >{label}</div>
  )
});

describe('EffectsSlider', () => {
  const label = 'Opacity';
  const range: [number, number] = [0, 100];
  const value = 50;
  const onChange = jest.fn();

  it('renders with correct label and passes props to Slider', () => {
    render(<EffectsSlider label={label} range={range} value={value} onChange={onChange} />);

    // Check if label renders correctly
    expect(screen.getByText(label)).toBeInTheDocument();

    // Check if Slider is rendered with correct props
    const slider = screen.getByTestId('mock-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('data-min', range[0].toString());
    expect(slider).toHaveAttribute('data-max', range[1].toString());
    expect(slider).toHaveAttribute('data-value', value.toString());
  });

  it('calls onChange handler when Slider value changes', () => {
    render(<EffectsSlider label={label} range={range} value={value} onChange={onChange} />);

    // Simulate changing value in Slider
    const slider = screen.getByTestId('mock-slider');
    fireEvent.click(slider);

    // Check if onChange handler is called)
    expect(onChange).toHaveBeenCalled();
  });
});
