import { render, screen } from "@testing-library/react";
import HomeSections from "../components/HomeSections";
import { vi } from "vitest";

describe("HomeSections edge cases", () => {
  it("renders nothing if sections list is empty", () => {
    render(<HomeSections sections={[]} onChange={vi.fn()} />);
    expect(screen.queryByText(/hero/i)).not.toBeInTheDocument();
  });
});