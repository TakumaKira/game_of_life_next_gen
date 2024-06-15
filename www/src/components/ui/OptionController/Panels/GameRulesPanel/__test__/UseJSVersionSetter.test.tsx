import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UseJSVersionSetter from '../UseJSVersionSetter'; // Adjust the import path as necessary

// Mocking necessary imports
jest.mock('../../CheckboxBase', () => (props: any) => (
  <div data-testid="checkbox-base">
    <input type="checkbox" checked={props.checked} onChange={props.onChange} />
    <label htmlFor="checkbox">
      {props.label}
      {props.checked
        ? props.checkedIcon
        : props.uncheckedIcon
      }
    </label>
  </div>
));
jest.mock('../../../../../IconBase', () => {
  return jest.fn(comp => comp);
});
jest.mock('../../../../../SVG', () => {
  // Mock SVG components as simple placeholders
  return {
    CheckboxCheckedSVG: (props: { $size: number }) => <div data-testid="checked-icon">CheckedSVG</div>,
    CheckboxUncheckedSVG: (props: { $size: number }) => <div data-testid="unchecked-icon">UncheckedSVG</div>,
  }
});

describe('UseJSVersionSetter', () => {
  test('renders UseJSVersionSetter component with initial props', () => {
    const mockChangeHandler = jest.fn();
    render(<UseJSVersionSetter useJSVersion={false} onChangeUseJSVersion={mockChangeHandler} />);
    
    expect(screen.getByTestId('checkbox-base')).toBeInTheDocument();
    expect(screen.getByText(/Use JavaScript version/)).toBeInTheDocument();
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
  });

  test('calls onChange handler when checkbox is clicked', () => {
    const mockChangeHandler = jest.fn();
    render(<UseJSVersionSetter useJSVersion={false} onChangeUseJSVersion={mockChangeHandler} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockChangeHandler).toHaveBeenCalledWith(true);
  });

  test('displays correct icons based on useJSVersion prop', () => {
    const { rerender } = render(<UseJSVersionSetter useJSVersion={false} onChangeUseJSVersion={() => {}} />);
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();

    rerender(<UseJSVersionSetter useJSVersion={true} onChangeUseJSVersion={() => {}} />);
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });
});
