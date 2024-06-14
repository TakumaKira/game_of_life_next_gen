import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../index';
import * as utils from '../utils';

// Mock utility functions
jest.mock('../utils', () => ({
  getUpdatedRate: jest.fn(),
  rateToValue: jest.fn(),
  valueToRate: jest.fn(),
}));

describe('Slider component', () => {
  beforeEach(() => {
    // Setup default mock returns
    (utils.valueToRate as jest.Mock).mockReturnValue(0.5);
    (utils.rateToValue as jest.Mock).mockReturnValue(50);
    (utils.getUpdatedRate as jest.Mock).mockReturnValue(0.75);

    // Mock DOM measurements
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 300,
        height: 18,
        top: 0,
        left: 0,
        right: 300,
        bottom: 18,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      };
    });
  });

  it('initializes with correct knob position based on value', () => {
    render(<Slider range={[0, 100]} value={50} onChange={() => {}} />);
    expect(utils.valueToRate).toHaveBeenCalledWith(50, [0, 100]);
    expect(utils.rateToValue).toHaveBeenCalledWith(0.5, [0, 100]);
  });

  it('calls onChange with the correct value when rate changes', () => {
    const onChangeMock = jest.fn();
    const { container } = render(<Slider range={[0, 100]} value={50} onChange={onChangeMock} />);
    fireEvent.mouseDown(container.firstChild!);
    expect(utils.getUpdatedRate).toHaveBeenCalled();
    expect(utils.rateToValue).toHaveBeenCalledWith(0.75, [0, 100]);
    expect(onChangeMock).toHaveBeenCalledWith(50);
  });

  it('updates rate and knob position on mouse move when dragging', () => {
    const { container } = render(<Slider range={[0, 100]} value={50} onChange={() => {}} />);
    const slider = container.firstChild;
    fireEvent.mouseDown(slider!);
    fireEvent.mouseMove(window, { clientX: 150 });
    expect(utils.getUpdatedRate).toHaveBeenCalledTimes(2);
    expect(utils.rateToValue).toHaveBeenCalledTimes(2); // Once for initial and once for update
  });

  it('stops dragging on mouse up', () => {
    const onChangeMock = jest.fn();
    const { container } = render(<Slider range={[0, 100]} value={50} onChange={onChangeMock} />);
    const slider = container.firstChild;
    fireEvent.mouseDown(slider!);
    fireEvent.mouseMove(window, { clientX: 150 });
    fireEvent.mouseUp(window);
    // Assume that the internal state `isDragging` should be false now, but we need to confirm visually or through behavior
    fireEvent.mouseMove(window, { clientX: -150 });
    expect(utils.getUpdatedRate).toHaveBeenLastCalledWith(150, expect.any(Object), expect.any(Object));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
