import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionButtons from '../index'; // Adjust the import path as necessary
import { OptionPanels } from '../../types'; // Ensure this is correctly imported

// Mock the SVG components and OptionButtonBase
jest.mock('@/components/SVG', () => ({
  GameSettingSVG: () => <div>GameSettingSVG</div>,
  EffectSettingSVG: () => <div>EffectSettingSVG</div>,
  StatsSVG: () => <div>StatsSVG</div>
}));
jest.mock('../OptionButtonBase', () => (Component: React.FunctionComponent) => () => <Component />);

describe('OptionButtons', () => {
  const mockOnSelectOpenedPanel = jest.fn();

  beforeEach(() => {
    render(<OptionButtons onSelectOpenedPanel={mockOnSelectOpenedPanel} />);
  });

  it('renders game settings button with correct props', () => {
    const gameButton = screen.getByText('GameSettingSVG');
    expect(gameButton).toBeInTheDocument();
    fireEvent.click(gameButton);
    expect(mockOnSelectOpenedPanel).toHaveBeenCalledWith(OptionPanels.GAME_RULES);
  });

  it('renders effect settings button with correct props', () => {
    const effectsButton = screen.getByText('EffectSettingSVG');
    expect(effectsButton).toBeInTheDocument();
    fireEvent.click(effectsButton);
    expect(mockOnSelectOpenedPanel).toHaveBeenCalledWith(OptionPanels.EFFECTS);
  });

  it('renders stats button with correct props', () => {
    const statsButton = screen.getByText('StatsSVG');
    expect(statsButton).toBeInTheDocument();
    fireEvent.click(statsButton);
    expect(mockOnSelectOpenedPanel).toHaveBeenCalledWith(OptionPanels.STATS);
  });
});
