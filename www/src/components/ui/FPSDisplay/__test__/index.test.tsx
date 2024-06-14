import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import FPSDisplay from "../index";

// Mocking the Data component
jest.mock("../Data", () => {
  return {
    __esModule: true,
    default: ({ label, value }: { label: string, value: number }) => (
      <div data-testid="mock-data">
        {label}: {value}
      </div>
    ),
  };
});

describe("FPSDisplay Component", () => {
  const mockFpsData = {
    fps: 60,
    mean: 55,
    min: 30,
    max: 70
  };

  it("renders correctly with mocked Data component", () => {
    render(<FPSDisplay fpsData={mockFpsData} />);
    expect(screen.getByText("Frames per Second")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-data").length).toBe(4);
    expect(screen.getByText("Latest: 60")).toBeInTheDocument();
    expect(screen.getByText("Avg of last 100: 55")).toBeInTheDocument();
    expect(screen.getByText("Min of last 100: 30")).toBeInTheDocument();
    expect(screen.getByText("Max of last 100: 70")).toBeInTheDocument();
  });

  // Additional tests as needed...
});
