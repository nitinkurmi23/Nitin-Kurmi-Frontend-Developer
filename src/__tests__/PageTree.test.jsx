import { render, screen } from "@testing-library/react";
import PageTree from "../components/PageTree";
import { vi } from "vitest";

// Mock reactflow internals to prevent console noise
vi.mock("reactflow", async () => {
  const actual = await vi.importActual("reactflow");
  return {
    ...actual,
    ReactFlowProvider: ({ children }) => <div>{children}</div>,
    ReactFlow: ({ nodes }) => (
      <div>
        {nodes.map((n) => (
          <div key={n.id}>{n.data.label}</div>
        ))}
      </div>
    ),
  };
});

describe("PageTree", () => {
  it("renders key nodes in the tree", () => {
    const mockSections = ["Hero", "Features", "CTA"];
    const setSections = vi.fn();

    render(
      <PageTree homeSections={mockSections} setHomeSections={setSections} />
    );

    expect(screen.getByText("Home Sections")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
