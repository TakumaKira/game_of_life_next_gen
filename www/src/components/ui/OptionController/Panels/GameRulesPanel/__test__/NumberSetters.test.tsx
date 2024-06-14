import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumberSetters from '../NumberSetters';
import NumberSetter from '../NumberSetter';

// Mock the NumberSetter component to isolate the test environment
jest.mock('../NumberSetter', () => {
  return jest.fn(({ label, value, onChange }) => (
    <div onClick={() => onChange(value + 1)}>{label}: {value}</div>
  ));
});

describe('NumberSetters component tests', () => {
  it('renders three NumberSetter components with correct props', () => {
    const mockChangeFieldSize = jest.fn();
    const mockChangeLifespan = jest.fn();
    const mockChangeSpeed = jest.fn();

    render(
      <NumberSetters
        fieldSize={10}
        onChangeFieldSize={mockChangeFieldSize}
        lifespan={5}
        onChangeLifespan={mockChangeLifespan}
        speed={3}
        onChangeSpeed={mockChangeSpeed}
      />
    );

    // Verify that NumberSetter components are rendered correctly
    expect(NumberSetter).toHaveBeenCalledTimes(3);
    expect(NumberSetter).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Field Size', value: 10 }),
      expect.anything()
    );
    expect(NumberSetter).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Lifespan', value: 5 }),
      expect.anything()
    );
    expect(NumberSetter).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Speed', value: 3 }),
      expect.anything()
    );
  });

  it('calls appropriate change handlers when values change', () => {
    const mockChangeFieldSize = jest.fn();
    const mockChangeLifespan = jest.fn();
    const mockChangeSpeed = jest.fn();

    const { getByText } = render(
      <NumberSetters
        fieldSize={10}
        onChangeFieldSize={mockChangeFieldSize}
        lifespan={5}
        onChangeLifespan={mockChangeLifespan}
        speed={3}
        onChangeSpeed={mockChangeSpeed}
      />
    );

    // Simulate user interactions
    fireEvent.click(getByText('Field Size: 10'));
    fireEvent.click(getByText('Lifespan: 5'));
    fireEvent.click(getByText('Speed: 3'));

    // Verify that the correct handlers are called with the correct new values
    expect(mockChangeFieldSize).toHaveBeenCalledWith(11);
    expect(mockChangeLifespan).toHaveBeenCalledWith(6);
    expect(mockChangeSpeed).toHaveBeenCalledWith(4);
  });
});
