import { Button as HeadlessButton } from "@headlessui/react";
import React from "react";
import clsx from "clsx";

type Button = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: keyof typeof ButtonTypes;
  htmlType?: "button" | "submit" | "reset";
};

const ButtonTypes = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  PILL: "PILL",
} as const;

const TypeClassMap = {
  [ButtonTypes.PRIMARY]: "min-w-20 bg-blue-600 text-white hover:bg-blue-500 ",
  [ButtonTypes.SECONDARY]: "min-w-20 bg-stone-300 hover:bg-stone-400",
  [ButtonTypes.PILL]:
    "bg-blue-600 inline-flex items-center justify-center text-white hover:bg-blue-800",
};

export function Button({
  children,
  onClick,
  type = ButtonTypes.PRIMARY,
  htmlType = "button",
}: Button) {
  return (
    <HeadlessButton
      onClick={onClick}
      className={clsx(
        "h-8 w-8 leading-none rounded-full focus:shadow-outline transition-colors duration-150",
        TypeClassMap[type],
      )}
      type={htmlType}
    >
      {children}
    </HeadlessButton>
  );
}

Button.TYPES = ButtonTypes;
