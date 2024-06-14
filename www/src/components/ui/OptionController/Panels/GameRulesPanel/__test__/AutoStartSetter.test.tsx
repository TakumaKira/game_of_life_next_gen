import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutoStartSetter from '../AutoStartSetter'; // Adjust the import path as necessary

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

describe('AutoStartSetter', () => {
  test('renders AutoStartSetter component with initial props', () => {
    const mockChangeHandler = jest.fn();
    render(<AutoStartSetter autoStartOnChangeGameRules={false} onChangeAutoStartOnChangeGameRules={mockChangeHandler} />);
    
    expect(screen.getByTestId('checkbox-base')).toBeInTheDocument();
    expect(screen.getByText(/Changing game rules restarts the game./)).toBeInTheDocument();
    expect(screen.getByText(/Do you want to prevent autoplay?/)).toBeInTheDocument();
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
  });

  test('calls onChange handler when checkbox is clicked', () => {
    const mockChangeHandler = jest.fn();
    render(<AutoStartSetter autoStartOnChangeGameRules={false} onChangeAutoStartOnChangeGameRules={mockChangeHandler} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockChangeHandler).toHaveBeenCalledWith(true);
  });

  test('displays correct icons based on autoStartOnChangeGameRules prop', () => {
    const { rerender } = render(<AutoStartSetter autoStartOnChangeGameRules={false} onChangeAutoStartOnChangeGameRules={() => {}} />);
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();

    rerender(<AutoStartSetter autoStartOnChangeGameRules={true} onChangeAutoStartOnChangeGameRules={() => {}} />);
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });
});
