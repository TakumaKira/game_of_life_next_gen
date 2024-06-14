import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioOption from '../RadioOption'; // Adjust the import path as necessary

// Mocks for SVG imports
jest.mock('../../../../../SVG', () => ({
  RadioCheckedSVG: () => <div data-testid="radio-checked-svg"></div>,
  RadioUncheckedSVG: () => <div data-testid="radio-unchecked-svg"></div>,
}));

// Mock for IconBase HOC
jest.mock('../../../../../IconBase', () => {
  return jest.fn().mockImplementation((SVGComponent) => SVGComponent);
});

describe('RadioOption Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with unchecked state', () => {
    render(<RadioOption label="Test Label" selected={false} onClick={mockOnClick} />);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(screen.getByTestId('radio-unchecked-svg')).toBeInTheDocument();
  });

  test('renders with checked state', () => {
    render(<RadioOption label="Test Label" selected={true} onClick={mockOnClick} />);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(screen.getByTestId('radio-checked-svg')).toBeInTheDocument();
  });

  test('triggers onClick when the container is clicked', () => {
    render(<RadioOption label="Clickable" selected={false} onClick={mockOnClick} />);
    const container = screen.getByText('Clickable').closest('div');
    fireEvent.click(container!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
