import { describe, it, expect, beforeEach } from "vitest";

const defaultSections = ["Hero", "Features", "Testimonials", "CTA", "Footer"];

describe("LocalStorage (pageStructure)", () => {
  beforeEach(() => localStorage.clear());

  it("saves homeSections inside pageStructure", () => {
    const expectedSections = ["Hero", "CTA"];
    const saveData = {
      homeSections: expectedSections,
      nodes: [],
      edges: [],
    };

    localStorage.setItem("pageStructure", JSON.stringify(saveData));

    const loaded = JSON.parse(localStorage.getItem("pageStructure"));
    expect(loaded.homeSections).toEqual(expectedSections);
    expect(loaded.nodes).toEqual([]);
    expect(loaded.edges).toEqual([]);
  });

  it("loads homeSections correctly from pageStructure", () => {
    const stored = {
      homeSections: ["Hero", "Features", "Footer"],
      nodes: [{ id: "home", data: {} }],
      edges: [],
    };

    localStorage.setItem("pageStructure", JSON.stringify(stored));

    const loaded = JSON.parse(localStorage.getItem("pageStructure"));
    expect(loaded.homeSections).toEqual(["Hero", "Features", "Footer"]);
    expect(loaded.nodes.length).toBe(1);
  });

  it("resets homeSections to default inside pageStructure", () => {
    const before = {
      homeSections: ["Hero", "CTA"],
      nodes: [{ id: "home", data: {} }],
      edges: [],
    };

    localStorage.setItem("pageStructure", JSON.stringify(before));

    const current = JSON.parse(localStorage.getItem("pageStructure"));
    const afterReset = {
      ...current,
      homeSections: defaultSections,
    };

    localStorage.setItem("pageStructure", JSON.stringify(afterReset));

    const loaded = JSON.parse(localStorage.getItem("pageStructure"));
    expect(loaded.homeSections).toEqual(defaultSections);
  });
});
