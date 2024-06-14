import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StatsPanel from '../index';

jest.mock('../../CheckboxBase', () => jest.fn(({ checked, onChange, id, checkedIcon, uncheckedIcon }) => (
  <div data-testid={id} onClick={() => onChange({ target: { checked: !checked } })}>
    {checked ? checkedIcon : uncheckedIcon}
  </div>
)));

jest.mock('../../../../../SVG', () => ({
  CheckboxCheckedSVG: () => 'CheckboxCheckedSVG',
  CheckboxUncheckedSVG: () => 'CheckboxUncheckedSVG',
}));

jest.mock('../../../../../IconBase', () => jest.fn(Component => () => (
  <div>{Component()}</div>
)));

describe('StatsPanel', () => {
  const mockOnChangeShowFPS = jest.fn();
  const mockOnChangeShowWasmLogOnNextFrame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the StatsPanel with initial props', () => {
    const { getByTestId } = render(
      <StatsPanel
        showFPS={false}
        onChangeShowFPS={mockOnChangeShowFPS}
        showWasmLogOnNextFrame={false}
        onChangeShowWasmLogOnNextFrame={mockOnChangeShowWasmLogOnNextFrame}
      />
    );

    expect(getByTestId('show-fps').textContent).toBe('CheckboxUncheckedSVG');
    expect(getByTestId('show-wasm-log-on-next-frame').textContent).toBe('CheckboxUncheckedSVG');
  });

  it('should handle showFPS checkbox toggle', () => {
    const { getByTestId } = render(
      <StatsPanel
        showFPS={false}
        onChangeShowFPS={mockOnChangeShowFPS}
        showWasmLogOnNextFrame={false}
        onChangeShowWasmLogOnNextFrame={mockOnChangeShowWasmLogOnNextFrame}
      />
    );

    fireEvent.click(getByTestId('show-fps'));
    expect(mockOnChangeShowFPS).toHaveBeenCalledWith(true);
  });

  it('should handle showWasmLogOnNextFrame checkbox toggle', () => {
    const { getByTestId } = render(
      <StatsPanel
        showFPS={false}
        onChangeShowFPS={mockOnChangeShowFPS}
        showWasmLogOnNextFrame={false}
        onChangeShowWasmLogOnNextFrame={mockOnChangeShowWasmLogOnNextFrame}
      />
    );

    fireEvent.click(getByTestId('show-wasm-log-on-next-frame'));
    expect(mockOnChangeShowWasmLogOnNextFrame).toHaveBeenCalledWith(true);
  });
});
