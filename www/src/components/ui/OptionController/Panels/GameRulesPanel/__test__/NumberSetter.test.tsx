import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberSetter from '../NumberSetter'; // Adjust the import path as needed

// Mock Button component
jest.mock('../../Button', () => (props: any) => (
  <button onClick={props.onClick}>{props.children}</button>
));

// Mock window.prompt
const mockPrompt = jest.spyOn(window, 'prompt');

describe('NumberSetter Component', () => {
  it('renders the component with initial props', () => {
    render(<NumberSetter label="Field Size" value={30} onChange={jest.fn()} />);
    expect(screen.getByText('Current Field Size:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Change Field Size')).toBeInTheDocument();
  });

  it('handles valid input correctly', () => {
    const handleChange = jest.fn();
    mockPrompt.mockReturnValue('35');
    render(<NumberSetter label="Field Size" value={30} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Change Field Size'));
    expect(handleChange).toHaveBeenCalledWith(35);
  });

  it('does nothing when input is cancelled', () => {
    const handleChange = jest.fn();
    mockPrompt.mockReturnValue(null);
    render(<NumberSetter label="Field Size" value={30} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Change Field Size'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does nothing when input is invalid', () => {
    const handleChange = jest.fn();
    mockPrompt.mockReturnValue('invalid');
    render(<NumberSetter label="Field Size" value={30} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Change Field Size'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
