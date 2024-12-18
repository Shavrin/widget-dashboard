import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useBoolean } from "usehooks-ts";
import {
  defaultScript,
  WidgetModal,
  type WidgetModalProps,
} from "./WidgetModal.tsx";

// monaco-editor is not stable in jsdom environment
vi.mock("@monaco-editor/react", async () => {
  return {
    Editor: vi
      .fn()
      .mockImplementation(({ value, onChange }) => (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )),
  };
});

function TestComponent(props: Omit<WidgetModalProps, "open" | "onClose">) {
  const { value, setFalse, setTrue } = useBoolean(false);

  return (
    <>
      <button onClick={setTrue}>Open Modal</button>
      <WidgetModal open={value} onClose={setFalse} {...props} />
    </>
  );
}

function setup(props: Partial<WidgetModalProps> = {}) {
  const onConfirm = vi.fn();

  render(<TestComponent onConfirm={onConfirm} {...props} />);

  return {
    onConfirm,
    openModalButton: screen.getByRole("button", { name: "Open Modal" }),
    user: userEvent.setup(),
  };
}

test.each([
  ["Create mode", undefined, "Create a widget", "create"],
  [
    "Edit mode",
    {
      id: "1",
      script: "<div>custom test script</div>",
    },
    "Edit widget",
    "edit",
  ],
])("renders widget modal in %s", async (_, widget, title, confirmText) => {
  const newScript = "<a>new</a>";

  const { openModalButton, onConfirm, user } = setup({ widget });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(openModalButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();

  const monacoEditor = screen.getByRole("textbox");

  expect(monacoEditor).toBeInTheDocument();
  expect(monacoEditor).toHaveValue(widget?.script ?? defaultScript);

  await user.clear(monacoEditor);
  await user.type(monacoEditor, newScript);

  expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: confirmText })).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: confirmText }));

  expect(onConfirm).toBeCalledWith({
    id: widget?.id ?? expect.any(String),
    script: newScript,
  });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("cancel button closes modal", async () => {
  const { user, openModalButton } = setup();

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(openModalButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "cancel" }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
