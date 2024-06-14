import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AliveCellBaseSetter from '../AliveCellBaseSetter';

// Mock the ActiveCellBaseCheckbox component
jest.mock('../ActiveCellBaseCheckbox', () => {
  return {
    __esModule: true,
    default: ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
      <div data-testid="mock-active-cell-checkbox">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} data-testid={`checkbox-${label}`} />
        <label htmlFor={id}>{label}</label>
      </div>
    ),
  };
});

describe('AliveCellBaseSetter', () => {
  const aliveCellBaseOptions = [2, 3, 5];
  const aliveCellBase: { [key: number]: boolean } = { 2: true, 3: false, 5: true };
  const mockOnChangeAliveCellBase = jest.fn();

  it('renders without crashing', () => {
    render(<AliveCellBaseSetter aliveCellBaseOptions={aliveCellBaseOptions} aliveCellBase={aliveCellBase} onChangeAliveCellBase={mockOnChangeAliveCellBase} />);
    expect(screen.getByText('Alive Cell Base:')).toBeInTheDocument();
  });

  it('displays the correct number of checkboxes', () => {
    render(<AliveCellBaseSetter aliveCellBaseOptions={aliveCellBaseOptions} aliveCellBase={aliveCellBase} onChangeAliveCellBase={mockOnChangeAliveCellBase} />);
    const checkboxes = screen.getAllByTestId(/checkbox-/);
    expect(checkboxes.length).toBe(aliveCellBaseOptions.length);
  });

  it('checkboxes reflect the correct checked state', () => {
    render(<AliveCellBaseSetter aliveCellBaseOptions={aliveCellBaseOptions} aliveCellBase={aliveCellBase} onChangeAliveCellBase={mockOnChangeAliveCellBase} />);
    aliveCellBaseOptions.forEach(option => {
      expect((screen.getByTestId(`checkbox-${option}`) as HTMLInputElement).checked).toBe(aliveCellBase[option]);
    });
  });

  it('calls onChangeAliveCellBase with the correct parameters on checkbox change', () => {
    render(<AliveCellBaseSetter aliveCellBaseOptions={aliveCellBaseOptions} aliveCellBase={aliveCellBase} onChangeAliveCellBase={mockOnChangeAliveCellBase} />);
    const checkbox = screen.getByTestId('checkbox-3');
    fireEvent.click(checkbox);
    expect(mockOnChangeAliveCellBase).toHaveBeenCalledWith({ ...aliveCellBase, 3: true });
  });
});
