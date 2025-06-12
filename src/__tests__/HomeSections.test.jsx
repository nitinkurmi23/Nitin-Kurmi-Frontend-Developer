import { render, screen } from "@testing-library/react";
import HomeSections from "../components/HomeSections";
import { vi } from "vitest";

describe("HomeSections", () => {
  it("renders all given section names", () => {
    // Arrange
    const mockSections = ["Hero", "Features", "CTA"];
    const mockOnChange = vi.fn();

    // Act
    render(<HomeSections sections={mockSections} onChange={mockOnChange} />);

    // Assert
    mockSections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });
});
