import { render, screen } from "@testing-library/react";
import { Widget } from "./Widget.tsx";
import { randomUUID } from "node:crypto";
import ResizeObserver from "resize-observer-polyfill";
import { userEvent } from "@testing-library/user-event";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";

global.ResizeObserver = ResizeObserver;

const customWidgetScript = "<div>inside widget</div>";

afterEach(() => {
  vi.restoreAllMocks();
});

function setup() {
  const edit = vi.fn();
  const remove = vi.fn();

  render(
    <Widget
      id={randomUUID()}
      script={customWidgetScript}
      edit={edit}
      remove={remove}
    />,
  );

  return {
    edit,
    remove,
    user: userEvent.setup(),
  };
}

test("renders Widget", async () => {
  const { user } = setup();

  const iframe = screen.getByTitle("widget content");

  expect(iframe).toBeInTheDocument();
  expect(iframe).toHaveAttribute("srcdoc", customWidgetScript);

  expect(document.body).toHaveFocus();

  await user.tab();

  expect(screen.getByLabelText("widget")).toHaveFocus();

  await user.tab();

  expect(screen.getByRole("button", { name: "options" })).toHaveFocus();

  await user.click(screen.getByRole("button", { name: "options" }));

  expect(screen.getByRole("menuitem", { name: "edit" })).toBeInTheDocument();
  expect(screen.getByRole("menuitem", { name: "remove" })).toBeInTheDocument();
});

test("remove action removes the widget", async () => {
  const { user, remove } = setup();

  await user.click(screen.getByRole("button", { name: "options" }));

  await user.click(screen.getByRole("menuitem", { name: "remove" }));

  expect(remove).toHaveBeenCalled();
});

test("edit action opens WidgetModal with correct props", async () => {
  vi.mock("../WidgetModal/WidgetModal.tsx", async () => {
    return {
      WidgetModal: vi.fn(),
    };
  });

  const { user, edit } = setup();

  await user.click(screen.getByRole("button", { name: "options" }));
  await user.click(screen.getByRole("menuitem", { name: "edit" }));

  expect(WidgetModal).toHaveBeenCalledWith(
    expect.objectContaining({
      onClose: expect.any(Function),
      onConfirm: edit,
      open: true,
      widget: {
        id: expect.any(String),
        script: customWidgetScript,
      },
    }),
    {},
  );
});
