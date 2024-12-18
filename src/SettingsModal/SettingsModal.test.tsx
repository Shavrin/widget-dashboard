import { render, screen } from "@testing-library/react";
import { SettingsModal, SettingsModalProps } from "./SettingsModal.tsx";
import { userEvent } from "@testing-library/user-event";
import { useBoolean } from "usehooks-ts";

function TestComponent(props: Partial<SettingsModalProps>) {
  const { value, setFalse, setTrue } = useBoolean(false);

  return (
    <>
      <button onClick={setTrue}>Open Modal</button>;
      <SettingsModal open={value} onClose={setFalse} {...props} />
    </>
  );
}

function setup() {
  render(<TestComponent />);

  return {
    openModalButton: screen.getByRole("button", { name: "Open Modal" }),
    user: userEvent.setup(),
  };
}

test("renders settings modal", async () => {
  const { openModalButton } = setup();

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(openModalButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();

  const stickToDropdown = screen.getByRole("combobox", {
    name: "Stick widgets to:",
  });

  expect(stickToDropdown).toBeInTheDocument();

  expect(stickToDropdown).toHaveValue("Middle");

  expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "save" })).toBeInTheDocument();
});

test("cancel button closes modal", async () => {
  const { user, openModalButton } = setup();

  await userEvent.click(openModalButton);

  await user.click(screen.getByRole("button", { name: "cancel" }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("changing settings works", async () => {
  const { user, openModalButton } = setup();

  await userEvent.click(openModalButton);

  const stickToDropdown = screen.getByRole("combobox", {
    name: "Stick widgets to:",
  });

  expect(stickToDropdown).toHaveValue("Middle");

  await user.selectOptions(
    stickToDropdown,
    screen.getByRole("option", { name: "Left" }),
  );

  expect(stickToDropdown).toHaveValue("Left");

  await user.click(screen.getByRole("button", { name: "save" }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
