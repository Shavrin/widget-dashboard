import React from "react";

type Button = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-10 h-10 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-3xl focus:shadow-outline hover:bg-pink-800"
    >
      {children}
    </button>
  );
}
