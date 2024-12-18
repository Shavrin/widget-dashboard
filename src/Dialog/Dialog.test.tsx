import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog.tsx";
import { userEvent } from "@testing-library/user-event";

const setup = (props = {}) => {
  const onClose = vi.fn();

  render(<Dialog open onClose={onClose} {...props} />);

  return {
    user: userEvent.setup(),
    onClose,
  };
};

test("renders dialog with proper children", () => {
  setup({
    children: (
      <>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Body>Body</Dialog.Body>
        <Dialog.Footer>Footer</Dialog.Footer>
      </>
    ),
  });

  expect(screen.getByText("Title")).toBeInTheDocument();
  expect(screen.getByText("Body")).toBeInTheDocument();
  expect(screen.getByText("Footer")).toBeInTheDocument();
});

test("runs onClose when clicked on backdrop", async () => {
  const { onClose, user } = setup({
    children: (
      <>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Body>Body</Dialog.Body>
        <Dialog.Footer>Footer</Dialog.Footer>
      </>
    ),
  });

  await user.click(document.body);

  expect(onClose).toHaveBeenCalled();
});
