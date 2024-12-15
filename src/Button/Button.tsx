import React from "react";

type Button = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className="focus:shadow-outline inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-pink-700 text-pink-100 transition-colors duration-150 hover:bg-pink-800"
    >
      {children}
    </button>
  );
}
