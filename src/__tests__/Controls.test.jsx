import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Controls from "../components/Controls";
import { vi } from "vitest";

describe("Controls", () => {
  it("renders all control buttons", () => {
    render(
      <Controls
        onSave={vi.fn()}
        onLoad={vi.fn()}
        onExport={vi.fn()}
        onResetSections={vi.fn()}
      />
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Load")).toBeInTheDocument();
    expect(screen.getByText("Export JSON")).toBeInTheDocument();
    expect(screen.getByText("Reset Sections")).toBeInTheDocument();
  });

  it("calls respective handlers when buttons are clicked", async () => {
    const onSave = vi.fn();
    const onLoad = vi.fn();
    const onExport = vi.fn();
    const onResetSections = vi.fn();

    render(
      <Controls
        onSave={onSave}
        onLoad={onLoad}
        onExport={onExport}
        onResetSections={onResetSections}
      />
    );

    const user = userEvent.setup();

    await user.click(screen.getByText("Save"));
    expect(onSave).toHaveBeenCalled();

    await user.click(screen.getByText("Load"));
    expect(onLoad).toHaveBeenCalled();

    await user.click(screen.getByText("Export JSON"));
    expect(onExport).toHaveBeenCalled();

    await user.click(screen.getByText("Reset Sections"));
    expect(onResetSections).toHaveBeenCalled();
  });
});
