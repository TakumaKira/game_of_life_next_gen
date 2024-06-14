import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drawer from '../index';

// Mock CloseButtonBase to replace it with a test-friendly component
jest.mock('../CloseButtonBase', () => {
  return {
    __esModule: true,
    default: (SVG: string) => (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button data-testid="close-button">Mock Close Button</button>
    )
  };
});

jest.mock('../../../../SVG', () => {
  return {
    __esModule: true,
    CloseSVG: () => 'svg'
  };
})

// Helper to advance timers
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Drawer Component', () => {
  it('renders correctly with initial props', () => {
    const { getByText } = render(
      <Drawer title="Test Title" children={<div>Test Content</div>} width={300} onClose={() => {}} />
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
    expect(getByText('Mock Close Button')).toBeInTheDocument();
  });

  it('updates delayedTitle after OPEN_CLOSE_DURATION when title changes to empty', async () => {
    const { getByText, rerender } = render(
      <Drawer title="Initial Title" children={<div />} width={300} onClose={() => {}} />
    );
    expect(getByText('Initial Title')).toBeInTheDocument();

    rerender(<Drawer title="Updated Title" children={<div />} width={300} onClose={() => {}} />);
    await act(async () => {
      await sleep(300); // OPEN_CLOSE_DURATION
    });
    expect(getByText('Updated Title')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Drawer title="Test Title" children={<div>Test Content</div>} width={300} onClose={onCloseMock} />
    );

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('applies correct styles based on width prop', () => {
    const { container } = render(
      <Drawer title="Test Title" children={<div>Test Content</div>} width={500} onClose={() => {}} />
    );
    expect(container.firstChild).toHaveStyle(`width: ${500}px`);
  });
});
