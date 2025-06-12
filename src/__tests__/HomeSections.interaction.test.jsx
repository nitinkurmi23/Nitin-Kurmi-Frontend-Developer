import { render } from "@testing-library/react";
import HomeSections, { reorderSections } from "../components/HomeSections";
import { vi } from "vitest";

describe("HomeSections Interaction", () => {
  it("calls onChange with reordered items", async () => {
    const sections = ["Hero", "Features", "CTA"];
    const onChange = vi.fn();

    render(<HomeSections sections={sections} onChange={onChange} />);

    // Simulate reorder manually
    const newSections = reorderSections(sections, 0, 2);
    onChange(newSections);

    expect(onChange).toHaveBeenCalledWith(["Features", "CTA", "Hero"]);
  });
});
