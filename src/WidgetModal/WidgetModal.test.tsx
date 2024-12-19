import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useBoolean } from "usehooks-ts";
import { WidgetModal, type WidgetModalProps } from "./WidgetModal.tsx";
import { WidgetType } from "../Widget/Widget.tsx";

function TestComponent(props: Omit<WidgetModalProps, "open" | "onClose">) {
  const { value, setFalse, setTrue } = useBoolean(false);

  return (
    <>
      <button onClick={setTrue}>Open Modal</button>
      <WidgetModal open={value} onClose={setFalse} {...props} />
    </>
  );
}

function setup(props: Partial<WidgetModalProps> | undefined = {}) {
  const onConfirm = vi.fn();

  render(<TestComponent onConfirm={onConfirm} {...props} />);

  return {
    onConfirm,
    openModalButton: screen.getByRole("button", { name: "Open Modal" }),
    user: userEvent.setup(),
  };
}

test.each<[string, WidgetType | undefined, string, string]>([
  ["Create mode", undefined, "Create a widget", "Create"],
  [
    "Edit mode",
    {
      id: "1",
      widgetName: "Timer",
    },
    "Edit widget",
    "Edit",
  ],
])("renders widget modal in %s", async (_, widget, title, confirmText) => {
  const { openModalButton, onConfirm, user } = setup({ widget });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(openModalButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();

  const widgetTypeDropdown = screen.getByRole("combobox", {
    name: "Choose widget type:",
  });

  expect(widgetTypeDropdown).toBeInTheDocument();

  expect(widgetTypeDropdown).toHaveValue("Timer");

  await user.selectOptions(
    widgetTypeDropdown,
    screen.getByRole("option", { name: "RandomPokemon" }),
  );

  expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: confirmText })).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: confirmText }));

  expect(onConfirm).toBeCalledWith({
    id: widget?.id ?? expect.any(String),
    widgetName: "RandomPokemon",
  });

  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
});

test("cancel button closes modal", async () => {
  const { user, openModalButton } = setup();

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(openModalButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "cancel" }));

  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
});
