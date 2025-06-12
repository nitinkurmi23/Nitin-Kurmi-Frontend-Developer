import { describe, it, expect } from "vitest";
import { reorderSections } from "../components/HomeSections";

describe("reorderSections()", () => {
  it("moves an item from index 0 to 2", () => {
    const list = ["Hero", "Features", "CTA"];
    const result = reorderSections(list, 0, 2);
    expect(result).toEqual(["Features", "CTA", "Hero"]);
  });

  it("moves an item from index 2 to 0", () => {
    const list = ["Hero", "Features", "CTA"];
    const result = reorderSections(list, 2, 0);
    expect(result).toEqual(["CTA", "Hero", "Features"]);
  });

  it("returns original list if indexes are the same", () => {
    const list = ["Hero", "Features", "CTA"];
    const result = reorderSections(list, 1, 1);
    expect(result).toEqual(list);
  });
});
