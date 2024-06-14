// GameRulesPanel.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameRulesPanel from '../index';

// Mocking the imported components
jest.mock('../NumberSetters', () => ({
  __esModule: true,
  default: jest.fn(({ fieldSize, onChangeFieldSize, lifespan, onChangeLifespan, speed, onChangeSpeed }) =>
    <div data-testid="number-setters-mock" data-1={fieldSize.toString()} data-2={lifespan.toString()} data-3={speed.toString()}>
      <button data-testid="number-setters-mock-field-size" onClick={onChangeFieldSize}>Change Field Size</button>
      <button data-testid="number-setters-mock-lifespan" onClick={onChangeLifespan}>Change Lifespan</button>
      <button data-testid="number-setters-mock-speed" onClick={onChangeSpeed}>Change Speed</button>
    </div>
  ),
}));

jest.mock('../AliveCellBaseSetter', () => ({
  __esModule: true,
  default: jest.fn(({ aliveCellBaseOptions, aliveCellBase, onChangeAliveCellBase }) => <div data-testid="alive-cell-base-setter-mock" data-1={JSON.stringify(aliveCellBaseOptions)} data-2={JSON.stringify(aliveCellBase)} onClick={onChangeAliveCellBase}></div>),
}));

jest.mock('../AutoStartSetter', () => ({
  __esModule: true,
  default: jest.fn(({ autoStartOnChangeGameRules, onChangeAutoStartOnChangeGameRules }) => <div data-testid="auto-start-setter-mock" data-1={autoStartOnChangeGameRules.toString()} onClick={onChangeAutoStartOnChangeGameRules}></div>),
}));

jest.mock('../../Scrollable', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div data-testid="scrollable-mock">{children}</div>),
}));

describe('GameRulesPanel', () => {
  const mockProps = {
    fieldSize: 5,
    onChangeFieldSize: jest.fn(),
    lifespan: 80,
    onChangeLifespan: jest.fn(),
    speed: 100,
    onChangeSpeed: jest.fn(),
    aliveCellBaseOptions: [1, 2, 3],
    aliveCellBase: { 1: true, 2: false },
    onChangeAliveCellBase: jest.fn(),
    autoStartOnChangeGameRules: true,
    onChangeAutoStartOnChangeGameRules: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = render(<GameRulesPanel {...mockProps} />);
    expect(getByTestId('number-setters-mock')).toBeInTheDocument();
    expect(getByTestId('alive-cell-base-setter-mock')).toBeInTheDocument();
    expect(getByTestId('auto-start-setter-mock')).toBeInTheDocument();
    expect(getByTestId('scrollable-mock')).toBeInTheDocument();
  });

  it('should handle field size changes via NumberSetters', () => {
    const { getByTestId } = render(<GameRulesPanel {...mockProps} />);
    expect(mockProps.onChangeFieldSize).toHaveBeenCalledTimes(0);
    expect(mockProps.onChangeLifespan).toHaveBeenCalledTimes(0);
    expect(mockProps.onChangeSpeed).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('number-setters-mock-field-size'));
    expect(mockProps.onChangeFieldSize).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeLifespan).toHaveBeenCalledTimes(0);
    expect(mockProps.onChangeSpeed).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('number-setters-mock-lifespan'));
    expect(mockProps.onChangeFieldSize).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeLifespan).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeSpeed).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('number-setters-mock-speed'));
    expect(mockProps.onChangeFieldSize).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeLifespan).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeSpeed).toHaveBeenCalledTimes(1);
  });

  it('should handle alive cell base changes via AliveCellBaseSetter', () => {
    const { getByTestId } = render(<GameRulesPanel {...mockProps} />);
    fireEvent.click(getByTestId('alive-cell-base-setter-mock'));
    expect(mockProps.onChangeAliveCellBase).toHaveBeenCalled();
  });

  it('should handle auto start changes via AutoStartSetter', () => {
    const { getByTestId } = render(<GameRulesPanel {...mockProps} />);
    fireEvent.click(getByTestId('auto-start-setter-mock'));
    expect(mockProps.onChangeAutoStartOnChangeGameRules).toHaveBeenCalled();
  });
});
