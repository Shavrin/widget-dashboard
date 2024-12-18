import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button, type ButtonProps } from ".";

const setup = (props: Partial<ButtonProps> = {}) => {
  return {
    ...render(<Button {...props}>{props.children}</Button>),
    user: userEvent.setup(),
    button: screen.getByRole("button"),
  };
};

test("renders button", () => {
  const { button } = setup();

  expect(button).toBeInTheDocument();
});

test("onClick is called when clicked", async () => {
  const onClick = vi.fn();

  const { button, user } = setup({ onClick });

  await user.click(button);

  expect(onClick).toHaveBeenCalledOnce();
});

test("renders children", () => {
  const buttonText = "Test";
  const { button } = setup({ children: buttonText });

  expect(button).toHaveTextContent(buttonText);
});

test("renders htmlType='button' by default", () => {
  const { button } = setup();

  expect(button).toHaveAttribute("type", "button");
});

test.each<ButtonProps["htmlType"]>(["button", "submit", "reset"])(
  "renders proper htmlType",
  (htmlType) => {
    const { button } = setup({ htmlType });

    expect(button).toHaveAttribute("type", htmlType);
  },
);

test.each([
  [
    Button.TYPES.PILL,
    "bg-blue-600 inline-flex items-center justify-center text-white hover:bg-blue-800",
  ],
  [Button.TYPES.PRIMARY, "min-w-20 bg-blue-600 text-white hover:bg-blue-500"],
  [Button.TYPES.SECONDARY, "min-w-20 bg-stone-300 hover:bg-stone-400"],
])("renders props class for proper button type", (type, className) => {
  const { button } = setup({ type });

  expect(button).toHaveClass(className);
});
