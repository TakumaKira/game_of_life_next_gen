// PlayController.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayController from '../index';

// Mocking local components and SVGs
jest.mock('../PlayControllerButtonBase', () => (SVG: any) => () => <SVG />);
jest.mock('../../../SVG', () => ({
  PlaySVG: () => <svg data-testid="PlaySVG" />,
  PauseSVG: () => <svg data-testid="PauseSVG" />,
  NextFrameSVG: () => <svg data-testid="NextFrameSVG" />,
  RestartSVG: () => <svg data-testid="RestartSVG" />,
  CheckboxCheckedSVG: () => <svg data-testid="CheckboxCheckedSVG" />,
  CheckboxUncheckedSVG: () => <svg data-testid="CheckboxUncheckedSVG" />,
  CameraResetSVG: () => <svg data-testid="CameraResetSVG" />
}));
jest.mock('../PlayControllerButtonTooltip', () => ({ children, $text, onClick }: { children: React.ReactNode, $text: string, onClick: () => void }) => (
  <button onClick={onClick} aria-label={$text}>
    {children}
  </button>
));

describe('PlayController', () => {
  const defaultProps = {
    style: {},
    isPlaying: false,
    onClickPlayPauseButton: jest.fn(),
    onClickNextFrameButton: jest.fn(),
    onClickRestartButton: jest.fn(),
    autoStart: false,
    onChangeAutoStart: jest.fn(),
    onClickCameraResetButton: jest.fn()
  };

  it('renders correctly', () => {
    render(<PlayController {...defaultProps} />);
    expect(screen.getByLabelText('Play')).toBeInTheDocument();
    expect(screen.getByLabelText('Next Frame')).toBeInTheDocument();
    expect(screen.getByLabelText('Restart')).toBeInTheDocument();
    expect(screen.getByLabelText('Autoplay on Restart')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset Camera')).toBeInTheDocument();
  });

  it('toggles between play and pause', () => {
    render(<PlayController {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Play'));
    expect(defaultProps.onClickPlayPauseButton).toHaveBeenCalled();
  });

  it('handles next frame button click', () => {
    render(<PlayController {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Next Frame'));
    expect(defaultProps.onClickNextFrameButton).toHaveBeenCalled();
  });

  it('handles restart button click', () => {
    render(<PlayController {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Restart'));
    expect(defaultProps.onClickRestartButton).toHaveBeenCalled();
  });

  it('toggles auto start', () => {
    render(<PlayController {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Autoplay on Restart'));
    expect(defaultProps.onChangeAutoStart).toHaveBeenCalledWith(!defaultProps.autoStart);
  });

  it('handles camera reset button click', () => {
    render(<PlayController {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Reset Camera'));
    expect(defaultProps.onClickCameraResetButton).toHaveBeenCalled();
  });
});
