import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioSelector from '../index';

// Mocking RadioOption component
jest.mock('../RadioOption', () => {
  return ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button
      aria-label={label}
      aria-selected={selected}
      onClick={onClick}
    >
      {label}
    </button>
  );
});

describe('RadioSelector', () => {
  const options = [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' }
  ];

  it('renders options correctly', () => {
    const { getByLabelText } = render(
      <RadioSelector
        selectedKey="option1"
        options={options}
        onChange={() => {}}
      />
    );

    options.forEach(option => {
      expect(getByLabelText(option.label)).toBeInTheDocument();
      expect(getByLabelText(option.label).getAttribute('aria-selected')).toBe(option.key === 'option1' ? 'true' : 'false');
    });
  });

  it('selects an option when clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <RadioSelector
        selectedKey="option1"
        options={options}
        onChange={handleChange}
      />
    );

    fireEvent.click(getByLabelText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('option2');
  });
});
