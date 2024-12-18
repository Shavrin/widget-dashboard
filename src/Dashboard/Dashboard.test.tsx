import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard.tsx";
import { userEvent } from "@testing-library/user-event";
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;

function setup() {
  render(<Dashboard />);

  return {
    user: userEvent.setup(),
  };
}

test("renders widgets", () => {
  setup();

  expect(screen.getAllByLabelText("widget")).toHaveLength(3);
});

test("renders command buttons", async () => {
  const { user } = setup();

  const dashboardOptionsButton = screen.getByRole("button", {
    name: "dashboard options",
  });

  await user.click(dashboardOptionsButton);

  expect(
    screen.getByRole("menuitem", { name: "Create widget" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("menuitem", { name: "Settings" }),
  ).toBeInTheDocument();
});
