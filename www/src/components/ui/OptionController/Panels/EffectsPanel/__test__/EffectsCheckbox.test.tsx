import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckboxBase from '../../CheckboxBase';

// Mock local dependencies
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
  return jest.fn((Icon: React.FC) => (props: { $size: number }) => <Icon />);
});
jest.mock('@/components/SVG', () => ({
  CheckboxCheckedSVG: () => <div>CheckedSVG</div>,
  CheckboxUncheckedSVG: () => <div>UncheckedSVG</div>,
}));

// Import the component to be tested
import EffectsCheckbox from '../EffectsCheckbox';  // Adjust the import path as necessary

describe('EffectsCheckbox', () => {
  it('renders with correct props', () => {
    const onChangeMock = jest.fn();
    render(<EffectsCheckbox id="test-checkbox" label="Test Label" value={true} onChange={onChangeMock} />);

    const checkbox = screen.getByText('Test Label');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const onChangeMock = jest.fn();
    render(<EffectsCheckbox id="test-checkbox" label="Test Label" value={false} onChange={onChangeMock} />);

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('displays the correct icon based on checked state', () => {
    const { rerender } = render(<EffectsCheckbox id="test1" label="Label" value={true} onChange={jest.fn()} />);
    expect(screen.getByText('CheckedSVG')).toBeInTheDocument();

    rerender(<EffectsCheckbox id="test1" label="Label" value={false} onChange={jest.fn()} />);
    expect(screen.getByText('UncheckedSVG')).toBeInTheDocument();
  });
});
