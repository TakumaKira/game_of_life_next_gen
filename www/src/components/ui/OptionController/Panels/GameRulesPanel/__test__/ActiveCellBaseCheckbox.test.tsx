import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActiveCellBaseCheckbox from '../ActiveCellBaseCheckbox'; // Adjust the import path as necessary
import CheckboxBase from '../../CheckboxBase';

// Mock the dependencies
jest.mock('../../CheckboxBase', () => (props: Parameters<typeof CheckboxBase>[0]) => {
  const { id, checked, onChange, label, checkedIcon, uncheckedIcon } = props
  return (
    <div>
      <input id= {id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>
        {label}
        {checked ? checkedIcon : uncheckedIcon}
      </label>
    </div>
  )
});
jest.mock('../../../../../IconBase', () => {
  return jest.fn().mockImplementation((SVG) => {
    return (props: any) => <div>{SVG}</div>;
  });
});
jest.mock('../../../../../SVG', () => ({
  CheckboxUncheckedSVG: 'CheckboxUncheckedSVG',
  CheckboxCheckedSVG: 'CheckboxCheckedSVG',
}));

describe('ActiveCellBaseCheckbox', () => {
  const mockOnChange = jest.fn();
  const props = {
    id: 'test-id',
    label: 'Test Label',
    checked: false,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with unchecked state', () => {
    render(<ActiveCellBaseCheckbox {...props} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('CheckboxUncheckedSVG')).toBeInTheDocument();
  });

  it('renders correctly with checked state', () => {
    render(<ActiveCellBaseCheckbox {...props} checked={true} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('CheckboxCheckedSVG')).toBeInTheDocument();
  });

  it('calls onChange when the checkbox is clicked', () => {
    render(<ActiveCellBaseCheckbox {...props} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
