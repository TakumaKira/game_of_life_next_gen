import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckboxBase from '../CheckboxBase';

describe('CheckboxBase', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders with label before the icon when labelPosition is "before"', () => {
    render(
      <CheckboxBase
        id="test-checkbox"
        checked={false}
        onChange={mockOnChange}
        label="Test Label"
        labelPosition="before"
        checkedIcon={<svg data-testid="checked-icon" />}
        uncheckedIcon={<svg data-testid="unchecked-icon" />}
        labelStyle={{ fontWeight: 'bold' }}
        color="black"
        hoverColor="gray"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
  });

  it('changes from unchecked to checked on click', () => {
    render(
      <CheckboxBase
        id="test-checkbox"
        checked={false}
        onChange={mockOnChange}
        label="Test Label"
        labelPosition="after"
        checkedIcon={<svg data-testid="checked-icon" />}
        uncheckedIcon={<svg data-testid="unchecked-icon" />}
        labelStyle={{ fontWeight: 'bold' }}
        color="black"
        hoverColor="gray"
      />
    );

    fireEvent.click(screen.getByLabelText('Test Label'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays the checked icon when checked is true', () => {
    render(
      <CheckboxBase
        id="test-checkbox"
        checked={true}
        onChange={mockOnChange}
        label="Test Label"
        labelPosition="after"
        checkedIcon={<svg data-testid="checked-icon" />}
        uncheckedIcon={<svg data-testid="unchecked-icon" />}
        labelStyle={{ fontWeight: 'bold' }}
        color="black"
        hoverColor="gray"
      />
    );

    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });

  it('applies correct styles for label', () => {
    render(
      <CheckboxBase
        id="test-checkbox"
        checked={false}
        onChange={mockOnChange}
        label="Test Label"
        labelPosition="after"
        checkedIcon={<svg />}
        uncheckedIcon={<svg />}
        labelStyle={{ fontWeight: 'bold' }}
        color="black"
        hoverColor="gray"
      />
    );

    const label = screen.getByText('Test Label');
    expect(label).toHaveStyle('font-weight: bold');
  });
});
