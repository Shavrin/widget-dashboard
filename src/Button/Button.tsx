import React from "react";

type Button = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Button) {
  return (
    <button onClick={onClick} className="rounded-3xl hover:bg-blue-400 p-2">
      {children}
    </button>
  );
}
