import { Button as HeadlessButton } from "@headlessui/react";
import React from "react";

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
  [ButtonTypes.PRIMARY]:
    "h-10 w-10 text-gray-100 rounded bg-pink-700 min-w-24 transition-colors duration-150 hover:bg-pink-800",
  [ButtonTypes.SECONDARY]:
    "h-10 w-10 min-w-20 rounded bg-gray-700 text-gray-100 transition-colors duration-150 hover:bg-gray-600",
  [ButtonTypes.PILL]:
    "h-10 w-10 focus:shadow-outline rounded-full bg-pink-700 inline-flex items-center justify-center text-white text-pink-100 transition-colors duration-150 hover:bg-pink-800",
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
      className={TypeClassMap[type]}
      type={htmlType}
    >
      {children}
    </HeadlessButton>
  );
}

Button.TYPES = ButtonTypes;
