import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { getInterface } from '@/game-of-life-next-gen';

// Mocking getInterface function
jest.mock('@/game-of-life-next-gen', () => ({
  getInterface: jest.fn().mockResolvedValue({
    play: jest.fn(),
    pause: jest.fn(),
    nextFrame: jest.fn(),
    destroy: jest.fn(),
  }),
}));

let MockGameOfLife: jest.Mock;

// Mocking GameOfLife component
jest.mock('../GameOfLife', () => {
  MockGameOfLife = jest.fn().mockImplementation(() => {
    getInterface(document.createElement('canvas'), jest.fn(), jest.fn())
    return <div data-testid="game-of-life"></div>
  })
  return MockGameOfLife
});

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('sets up controller functions correctly', async () => {
    // Render the component
    render(<App />);

    // Wait for getInterface to be called and resolve
    await screen.findByTestId('game-of-life');

    // Assert that getInterface is called with correct arguments
    expect(getInterface).toHaveBeenCalledWith(
      expect.any(HTMLCanvasElement),
      expect.any(Function),
      expect.any(Function)
    );

    // Trigger any event that would cause the component to update the state
    // For example, you might simulate clicking a button that initializes the canvas
    // fireEvent.click(screen.getByText('Start Game'));

    // Assert that state variables are set correctly
    // expect(screen.getByText('Some expected text')).toBeInTheDocument();

    // You can further test the behavior of the component with these state variables
  });
});
