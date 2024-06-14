import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EffectsColorPicker from '../EffectsColorPicker'; // Adjust the import path as necessary
import ColorPicker from '../../ColorPicker';

// Mock the ColorPicker component
jest.mock('../../ColorPicker', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));

describe('EffectsColorPicker', () => {
  it('renders with the correct label', () => {
    const label = 'Test Label';
    render(<EffectsColorPicker id="test-id" label={label} value={{ r: 0, g: 0, b: 0, a: 1 }} onChange={() => {}} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it('passes the correct props to ColorPicker', () => {
    const value = { r: 0, g: 0, b: 0, a: 1 };
    const onChange = jest.fn();
    render(<EffectsColorPicker id="test-id" label="Test Label" value={value} onChange={onChange} />);
    
    // Expect ColorPicker to have been called with specified props
    expect(ColorPicker).toHaveBeenCalledWith({
      id: 'test-id',
      value: { color: value },
      onChange: expect.any(Function),
    }, expect.any(Object));
  });

  it('calls onChange when ColorPicker calls its onChange', () => {
    const mockOnChange = jest.fn();
    const newColor = { r: 0, g: 0, b: 0, a: 1 };
    const newHex8String = '#123456';
    
    // Setup the ColorPicker mock to simulate onChange
    (ColorPicker as jest.Mock<any, Parameters<typeof ColorPicker>>).mockImplementation(({ onChange }) => (
      <button onClick={() => onChange({ color: newColor, hex8String: newHex8String })}>Change Color</button>
    ));

    render(<EffectsColorPicker id="test-id" label="Test Label" value={{ r: 255, g: 255, b: 255, a: 1 }} onChange={mockOnChange} />);
    
    // Simulate clicking the button which triggers the onChange
    fireEvent.click(screen.getByText('Change Color'));
    expect(mockOnChange).toHaveBeenCalledWith(newColor);
  });
});
