import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

test("renders button", () => {
  render(<button>button</button>);

  expect(screen.getByRole("button")).toBeInTheDocument();
});
