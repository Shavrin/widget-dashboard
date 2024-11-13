import React from "react";

type Button = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Button) {
  return <button onClick={onClick}>{children}</button>;
}
