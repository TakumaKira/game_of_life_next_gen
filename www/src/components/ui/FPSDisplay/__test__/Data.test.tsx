import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Data from '../Data'; // Adjust the import path as needed

describe('Data Component', () => {
  test('renders without crashing', () => {
    render(<Data label="Latest" value={123} />);
    expect(screen.getByText(/Latest/i)).toBeInTheDocument();
  });

  test('displays the label and value correctly', () => {
    render(<Data label="Min" value={30.8} />);
    expect(screen.getByText(/Min/i)).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument(); // Checks rounded value
  });

  test('updates displayed value when prop changes', () => {
    const { rerender } = render(<Data label="Max" value={89.6} />);
    expect(screen.getByText('90')).toBeInTheDocument(); // Initial rounded value

    rerender(<Data label="Max" value={89.4} />);
    expect(screen.getByText('89')).toBeInTheDocument(); // Updated rounded value
  });

  // Optional: Test for styling - this is less common and can be complex due to styled-components
});
