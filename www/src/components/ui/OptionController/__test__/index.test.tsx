// OptionController.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionController from '../index';
import OptionButtons from '../OptionButtons';
import Drawer from '../Drawer';
import GameRulesPanel, { TITLE as GAME_RULES_PANEL_TITLE } from '../Panels/GameRulesPanel';
import EffectsPanel, { TITLE as EFFECTS_PANEL_TITLE } from '../Panels/EffectsPanel';
import StatsPanel, { TITLE as STATS_PANEL_TITLE } from '../Panels/StatsPanel';
import type { GLValuesConfigurable, TextureColors } from '@/game-of-life-next-gen';
import { OptionPanels } from '../types';

// Mock the local dependencies
jest.mock('../OptionButtons', () => jest.fn(() => null));
jest.mock('../Drawer', () => jest.fn(({ children, title }) => <div><span>{title}</span>{children}</div>));
jest.mock('../Panels/GameRulesPanel', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="game-rules-panel"></div>),
  TITLE: 'Game Rules',
  WIDTH: 572,
}));
jest.mock('../Panels/EffectsPanel', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="effects-panel"></div>),
  TITLE: 'Colors and Effects',
  WIDTH: 520,
}));
jest.mock('../Panels/StatsPanel', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="stats-panel"></div>),
  TITLE: 'Stats',
  WIDTH: 480,
}));

describe('OptionController', () => {
  const mockProps = {
    fieldSize: 50,
    onChangeFieldSize: jest.fn() as Parameters<typeof OptionController>[0]['onChangeFieldSize'],
    lifespan: 100,
    onChangeLifespan: jest.fn() as Parameters<typeof OptionController>[0]['onChangeLifespan'],
    speed: 10,
    onChangeSpeed: jest.fn() as Parameters<typeof OptionController>[0]['onChangeSpeed'],
    aliveCellBaseOptions: [0, 1, 2],
    aliveCellBase: { 0: true, 1: false },
    onChangeAliveCellBase: jest.fn() as Parameters<typeof OptionController>[0]['onChangeAliveCellBase'],
    autoStartOnChangeGameRules: true,
    onChangeAutoStartOnChangeGameRules: jest.fn() as Parameters<typeof OptionController>[0]['onChangeAutoStartOnChangeGameRules'],
    useJSVersion: false,
    onChangeUseJSVersion: jest.fn() as Parameters<typeof OptionController>[0]['onChangeUseJSVersion'],
    textureColors: {} as TextureColors,
    onChangeTextureColors: jest.fn() as Parameters<typeof OptionController>[0]['onChangeTextureColors'],
    glValuesConfigurable: {} as GLValuesConfigurable,
    onChangeGlValuesConfigurable: jest.fn() as Parameters<typeof OptionController>[0]['onChangeGlValuesConfigurable'],
    showFPS: true,
    onChangeShowFPS: jest.fn() as Parameters<typeof OptionController>[0]['onChangeShowFPS'],
    showWasmLogOnNextFrame: false,
    onChangeShowWasmLogOnNextFrame: jest.fn() as Parameters<typeof OptionController>[0]['onChangeShowWasmLogOnNextFrame'],
  };

  it('should render without crashing', () => {
    render(<OptionController {...mockProps} />);
    expect(OptionButtons).toHaveBeenCalled();
    expect(Drawer).toHaveBeenCalled();
  });

  it('should pass the correct props to the GameRulesPanel when opened', () => {
    render(<OptionController {...mockProps} />);
    act(() => {
      (OptionButtons as jest.Mock).mock.calls[0][0].onSelectOpenedPanel(OptionPanels.GAME_RULES);
    })
    expect(screen.getByText(GAME_RULES_PANEL_TITLE)).toBeInTheDocument();
    expect(GameRulesPanel).toHaveBeenCalledWith(expect.objectContaining({
      fieldSize: mockProps.fieldSize,
      onChangeFieldSize: mockProps.onChangeFieldSize,
      lifespan: mockProps.lifespan,
      onChangeLifespan: mockProps.onChangeLifespan,
      speed: mockProps.speed,
      onChangeSpeed: mockProps.onChangeSpeed,
      aliveCellBaseOptions: mockProps.aliveCellBaseOptions,
      aliveCellBase: mockProps.aliveCellBase,
      onChangeAliveCellBase: mockProps.onChangeAliveCellBase,
      autoStartOnChangeGameRules: mockProps.autoStartOnChangeGameRules,
      useJSVersion: mockProps.useJSVersion,
      onChangeUseJSVersion: mockProps.onChangeUseJSVersion,
    }), {});
  });

  it('should pass the correct props to the EffectsPanel when opened', () => {
    render(<OptionController {...mockProps} />);
    act(() => {
      (OptionButtons as jest.Mock).mock.calls[0][0].onSelectOpenedPanel(OptionPanels.EFFECTS);
    })
    expect(screen.getByText(EFFECTS_PANEL_TITLE)).toBeInTheDocument();
    expect(EffectsPanel).toHaveBeenCalledWith(expect.objectContaining({
      textureColors: mockProps.textureColors,
      onChangeTextureColors: mockProps.onChangeTextureColors,
      glValuesConfigurable: mockProps.glValuesConfigurable,
      onChangeGlValuesConfigurable: mockProps.onChangeGlValuesConfigurable,
    }), {});
  });

  it('should pass the correct props to the StatsPanel when opened', () => {
    render(<OptionController {...mockProps} />);
    act(() => {
      (OptionButtons as jest.Mock).mock.calls[0][0].onSelectOpenedPanel(OptionPanels.STATS);
    })
    expect(screen.getByText(STATS_PANEL_TITLE)).toBeInTheDocument();
    expect(StatsPanel).toHaveBeenCalledWith(expect.objectContaining({
      showFPS: mockProps.showFPS,
      onChangeShowFPS: mockProps.onChangeShowFPS,
      showWasmLogOnNextFrame: mockProps.showWasmLogOnNextFrame,
      onChangeShowWasmLogOnNextFrame: mockProps.onChangeShowWasmLogOnNextFrame,
    }), {});
  });
});

