import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActiveCellBaseCheckbox from '../GameRulesPanel/ActiveCellBaseCheckbox';

test('renders with initial state', () => {
  const { getByLabelText } = render(<ActiveCellBaseCheckbox id="test-checkbox" label="Test Checkbox" checked={false} onChange={() => {}} labelStyles={{}} />);
  const checkbox = getByLabelText(/test checkbox/i);
  expect(checkbox).not.toBeChecked();
});

test('label applies provided styles', () => {
  const style = { color: 'red' };
  render(<ActiveCellBaseCheckbox id="styled-checkbox" label="Styled Checkbox" checked={false} onChange={() => {}} labelStyles={style} />);
  const label = screen.getByText(/styled checkbox/i);
  expect(label).toHaveStyle(`color: ${style.color}`);
});

test('checkbox toggles on user interaction', () => {
  const handleChange = jest.fn();
  render(<ActiveCellBaseCheckbox id="clickable-checkbox" label="Clickable Checkbox" checked={false} onChange={handleChange} labelStyles={{}} />);
  const checkbox = screen.getByLabelText(/clickable checkbox/i);
  fireEvent.click(checkbox);
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('checkbox reflects new `checked` state when props change', () => {
  const { rerender, getByLabelText } = render(<ActiveCellBaseCheckbox id="dynamic-checkbox" label="Dynamic Checkbox" checked={false} onChange={() => {}} labelStyles={{}} />);
  const checkbox = getByLabelText(/dynamic checkbox/i);
  expect(checkbox).not.toBeChecked();

  // Re-render the same component with new props
  rerender(<ActiveCellBaseCheckbox id="dynamic-checkbox" label="Dynamic Checkbox" checked={true} onChange={() => {}} labelStyles={{}} />);
  expect(checkbox).toBeChecked();
});
