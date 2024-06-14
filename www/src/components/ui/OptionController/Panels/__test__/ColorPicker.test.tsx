import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorPicker from '../ColorPicker';
import '@testing-library/jest-dom';
import iro from '@jaames/iro';

// Mock iro ColorPicker
const mockColorPicker = {
  on: jest.fn(),
  off: jest.fn(),
  el: {
    getElementsByClassName: jest.fn(() => [{
      style: {},
      getElementsByClassName: jest.fn(() => [{
        style: {},
      }]),
    }]),
  },
  color: {
    set: jest.fn(),
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
    hex8String: '',
  }
};

jest.mock('@jaames/iro', () => ({
  ColorPicker: jest.fn(() => mockColorPicker),
  ui: {},
}));

describe('ColorPicker', () => {
  const setup = (props: any) => {
    return render(<ColorPicker {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the color picker on mount', () => {
    const onChange = jest.fn();
    setup({ id: 'test-picker', value: { hex8String: '#FFFFFFFF' }, onChange });

    expect(iro.ColorPicker).toHaveBeenCalledWith('#test-picker', expect.any(Object));
    expect(mockColorPicker.color.hex8String).toBe('#FFFFFFFF');
    expect(mockColorPicker.on).toHaveBeenCalledWith('color:change', expect.any(Function));
  });

  it('should handle color changes', () => {
    const onChange = jest.fn();
    setup({ id: 'test-picker', value: { color: { r: 255, g: 255, b: 255, a: 1 } }, onChange });
    const newColor = { red: 100, green: 150, blue: 200, alpha: 0.5, hex8String: '#6496C8FF' };

    // Simulate color change
    mockColorPicker.on.mock.calls.find(call => call[0] === 'color:change')[1](newColor);
    expect(onChange).toHaveBeenCalledWith({ color: { r: 100, g: 150, b: 200, a: 0.5 }, hex8String: '#6496C8FF' });
  });

  it('should unsubscribe from color:change on unmount', () => {
    const onChange = jest.fn();
    const { unmount } = setup({ id: 'test-picker', value: { color: { r: 255, g: 255, b: 255, a: 1 } }, onChange });

    unmount();
    expect(mockColorPicker.off).toHaveBeenCalledWith('color:change', expect.any(Function));
  });

  it('should update the color picker when value changes', () => {
    const onChange = jest.fn();
    const { rerender } = setup({ id: 'test-picker', value: { color: { r: 255, g: 255, b: 255, a: 1 } }, onChange });
    
    // Change props
    rerender(<ColorPicker id="test-picker" value={{ hex8String: '#000000FF' }} onChange={onChange} />);

    expect(mockColorPicker.color.hex8String).toBe('#000000FF');
  });
});
