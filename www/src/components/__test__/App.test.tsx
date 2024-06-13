import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { getController } from '../../hooks';
import OptionController from '../ui/OptionController'
import PlayController from '../ui/PlayController';
import FPSDisplay from '../ui/FPSDisplay';
import type { GLValuesConfigurable, OnUpdateFpsDataFn, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';
import { GL_VALUES_CONFIGURABLE_DEFAULTS, TEXTURE_COLORS_DEFAULT } from '@/game-of-life-next-gen/constants';

jest.mock<typeof FPSDisplay>('../ui/FPSDisplay', () => () =>
  <div data-testid="fps-display">
    FPS Display
  </div>
);
jest.mock<typeof PlayController>('../ui/PlayController', () => ({
  isPlaying,
  onClickPlayPauseButton,
  onClickNextFrameButton,
  onClickRestartButton,
  autoStart,
  onChangeAutoStart,
  onClickCameraResetButton,
}) => (
  <div data-testid="play-controller">
    <button onClick={onClickPlayPauseButton}>{isPlaying ? 'Pause' : 'Play'}</button>
    <button onClick={onClickNextFrameButton}>Next Frame</button>
    <button onClick={onClickRestartButton}>Restart</button>
    <button onClick={() => onChangeAutoStart(!autoStart)} data-is-playing={autoStart ? 'true' : 'false'}>Auto-Start Toggle</button>
    <button onClick={onClickCameraResetButton}>Reset Camera</button>
  </div>
));
jest.mock<typeof OptionController>('../ui/OptionController', () => jest.fn());

jest.mock('../../hooks', () => ({
  getController: jest.fn()
}));

jest.mock('../../game-of-life-next-gen', () => ({
  getInterface: jest.fn(),
}));

describe('App', () => {
  const mockPlay = jest.fn();
  const mockPause = jest.fn();
  const mockNextFrame = jest.fn();
  const mockResetCamera = jest.fn();
  const mockUpdateColors = jest.fn();
  const mockUpdateEffects = jest.fn();
  const mockDestroy = jest.fn();
  const mockRestart = jest.fn();
  let mockUpdateFpsData: OnUpdateFpsDataFn;
  let mockOnChangeFieldSize: (value: number) => void;
  let mockOnChangeLifespan: (value: number) => void;
  let mockOnChangeSpeed: (value: number) => void;
  let mockOnChangeAliveCellBase: (value: { [number: number]: boolean }) => void;
  let mockOnChangeAutoStartOnChangeGameRules: (value: boolean) => void;
  let mockOnChangeTextureColors: (value: TextureColorsNullable) => void;
  let mockOnChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void;
  let mockOnChangeShowFPS: (value: boolean) => void;
  let mockOnChangeShowWasmLogOnNextFrame: (value: boolean) => void;
  let getOptionControllerValues: () => {
    fieldSize: number,
    lifespan: number,
    speed: number,
    aliveCellBaseOptions: number[],
    aliveCellBase: { [number: number]: boolean },
    autoStartOnChangeGameRules: boolean,
    textureColors: TextureColors,
    glValuesConfigurable: GLValuesConfigurable,
    showFPS: boolean,
    showWasmLogOnNextFrame: boolean,
  }

  beforeEach(() => {
    jest.clearAllMocks();
    (getController as jest.Mock<ReturnType<typeof getController>, Parameters<typeof getController>>).mockImplementation((_, __, updatePlayingState, updateFpsData) => {
      mockUpdateFpsData = value => updateFpsData(value)
      return {
        play: mockPlay.mockImplementation(() => { updatePlayingState(true) }),
        pause: mockPause.mockImplementation(() => { updatePlayingState(false) }),
        nextFrame: mockNextFrame,
        resetCamera: mockResetCamera,
        updateColors: mockUpdateColors,
        updateEffects: mockUpdateEffects,
        destroy: mockDestroy,
        restart: mockRestart
      }
    });
    (OptionController as jest.Mock<ReturnType<typeof OptionController>, Parameters<typeof OptionController>>).mockImplementation(({
      fieldSize,
      onChangeFieldSize,
      lifespan,
      onChangeLifespan,
      speed,
      onChangeSpeed,
      aliveCellBaseOptions,
      aliveCellBase,
      onChangeAliveCellBase,
      autoStartOnChangeGameRules,
      onChangeAutoStartOnChangeGameRules,
      textureColors,
      onChangeTextureColors,
      glValuesConfigurable,
      onChangeGlValuesConfigurable,
      showFPS,
      onChangeShowFPS,
      showWasmLogOnNextFrame,
      onChangeShowWasmLogOnNextFrame,
    }) => {
      mockOnChangeFieldSize = value => onChangeFieldSize(value)
      mockOnChangeLifespan = value => onChangeLifespan(value)
      mockOnChangeSpeed = value => onChangeSpeed(value)
      mockOnChangeAliveCellBase = value => onChangeAliveCellBase(value)
      mockOnChangeAutoStartOnChangeGameRules = value => onChangeAutoStartOnChangeGameRules(value)
      mockOnChangeTextureColors = value => onChangeTextureColors(value)
      mockOnChangeGlValuesConfigurable = value => onChangeGlValuesConfigurable(value)
      mockOnChangeShowFPS = value => onChangeShowFPS(value)
      mockOnChangeShowWasmLogOnNextFrame = value => onChangeShowWasmLogOnNextFrame(value)
      getOptionControllerValues = () => ({
        fieldSize,
        lifespan,
        speed,
        aliveCellBaseOptions,
        aliveCellBase,
        autoStartOnChangeGameRules,
        textureColors,
        glValuesConfigurable,
        showFPS,
        showWasmLogOnNextFrame,
      })
      return (
        <div data-testid="option-controller">Option Controller</div>
      )
    })
  });

  describe('PlayController interactions', () => {
    it('renders correctly', () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('play-controller')).toBeInTheDocument();
      expect(getByTestId('option-controller')).toBeInTheDocument();
    });
  
    it('handles play/pause correctly', () => {
      const { getByText } = render(<App />);
      const playButton = getByText('Play');
      fireEvent.click(playButton);
      expect(mockPlay).toHaveBeenCalled();
      const pauseButton = getByText('Pause');
      fireEvent.click(pauseButton);
      expect(mockPause).toHaveBeenCalled();
    });
  
    it('handles next frame correctly', () => {
      const { getByText } = render(<App />);
      fireEvent.click(getByText('Next Frame'));
      expect(mockNextFrame).toHaveBeenCalled();
    });
  
    it('handles restart correctly', () => {
      const { getByText } = render(<App />);
      fireEvent.click(getByText('Restart'));
      expect(mockDestroy).toHaveBeenCalled();
      expect(mockRestart).toHaveBeenCalled();
    });
  
    it('handles toggle auto start correctly', () => {
      const { getByText, rerender } = render(<App />);
      expect(getByText('Auto-Start Toggle').dataset.isPlaying).toBe('true');
      fireEvent.click(getByText('Auto-Start Toggle'));
      rerender(<App />)
      expect(getByText('Auto-Start Toggle').dataset.isPlaying).toBe('false');
    })
  
    it('handles camera reset correctly', () => {
      const { getByText } = render(<App />);
      fireEvent.click(getByText('Reset Camera'));
      expect(mockResetCamera).toHaveBeenCalled();
    });
  })

  describe('OptionController interactions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles field size change correctly', () => {
      render(<App />);
      const newValue = 50;
      act(() => {
        mockOnChangeFieldSize(newValue);  // Changing field size to 50
      })
      expect(mockRestart).toHaveBeenCalledWith(expect.objectContaining({ fieldSize: newValue }), expect.anything());
      expect(getOptionControllerValues().fieldSize).toBe(newValue)
    });

    it('handles lifespan change correctly', () => {
      render(<App />);
      const newValue = 1000;
      act(() => {
        mockOnChangeLifespan(newValue);  // Changing lifespan to 1000
      })
      expect(mockRestart).toHaveBeenCalledWith(expect.objectContaining({ lifespan: newValue }), expect.anything());
      expect(getOptionControllerValues().lifespan).toBe(newValue)
    });

    it('handles speed change correctly', () => {
      render(<App />);
      const newValue = 20;
      act(() => {
        mockOnChangeSpeed(newValue);  // Changing speed to 20
      })
      expect(mockRestart).toHaveBeenCalledWith(expect.objectContaining({ speed: newValue }), expect.anything());
      expect(getOptionControllerValues().speed).toBe(newValue)
    });

    it('handles changes in alive cell base correctly', () => {
      render(<App />);
      const newValue = { 2: true, 3: true };
      act(() => {
        mockOnChangeAliveCellBase(newValue);  // Simulating a change in the alive cell base rules
      })
      expect(mockRestart).toHaveBeenLastCalledWith(expect.objectContaining({ aliveCellBase: [2, 3] }), expect.anything());
      expect(getOptionControllerValues().aliveCellBase).toEqual(newValue)
    });

    it('handles auto start change correctly', () => {
      render(<App />);
      const newValue = false;
      act(() => {
        mockOnChangeAutoStartOnChangeGameRules(newValue);
        mockOnChangeFieldSize(200);
      })
      expect(mockRestart).toHaveBeenCalledWith(expect.anything(), newValue);
      expect(getOptionControllerValues().autoStartOnChangeGameRules).toEqual(newValue)
    })

    it('calls updateColors when texture colors change', () => {
      render(<App />);
      const newValue = { aliveColors: ['#FFFFFFFF', '#000000FF', '#FF0000FF'] as [string, string, string] }
      act(() => {
        mockOnChangeTextureColors(newValue);  // Example texture colors change
      })
      expect(mockUpdateColors).toHaveBeenCalledWith(newValue);
      expect(getOptionControllerValues().textureColors).toEqual({ ...TEXTURE_COLORS_DEFAULT, ...newValue })
    });

    it('calls updateEffects when GL values change', () => {
      render(<App />);
      const newValue = { fxaaEnabled: true }
      act(() => {
        mockOnChangeGlValuesConfigurable(newValue);
      })
      expect(mockUpdateEffects).toHaveBeenCalledWith(newValue);
      expect(getOptionControllerValues().glValuesConfigurable).toEqual({ ...GL_VALUES_CONFIGURABLE_DEFAULTS, ...newValue })
    });

    it('handles show FPS change correctly', () => {
      const { getByTestId } = render(<App />);
      mockUpdateFpsData({ fps: 60, mean: 60, min: 60, max: 60 })
      const newValue = true;
      act(() => {
        mockOnChangeShowFPS(newValue);
      })
      expect(getByTestId('fps-display')).toBeInTheDocument();
      expect(getOptionControllerValues().showFPS).toEqual(newValue)
    })

    it('handles show wasm log change correctly', () => {
      const { getByText } = render(<App />);
      expect(mockNextFrame).not.toHaveBeenCalled();
      fireEvent.click(getByText('Next Frame'));
      expect(mockNextFrame).toHaveBeenCalledWith(false);
      const newValue = true;
      act(() => {
        mockOnChangeShowWasmLogOnNextFrame(newValue);
      })
      fireEvent.click(getByText('Next Frame'));
      expect(mockNextFrame).toHaveBeenCalledWith(newValue);
      expect(getOptionControllerValues().showWasmLogOnNextFrame).toEqual(newValue)
    })
  });
});
