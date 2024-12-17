import { ReactNode } from "react";
import {
  DialogTitle,
  Dialog as HDialog,
  Description,
  type DialogProps,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <HDialog {...props} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="min-h-96 min-w-80 max-w-lg space-y-4 rounded-3xl border-2 border-cyan-200 bg-gray-800 p-8 shadow-2xl shadow-pink-800">
          {children}
        </DialogPanel>
      </div>
    </HDialog>
  );
};

function Title({ children }: { children: ReactNode }) {
  return (
    <DialogTitle className="text-3xl font-bold text-gray-300">
      {children}
    </DialogTitle>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <Description>{children}</Description>;
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 mt-1.5">{children}</div>;
}

const DialogNamespace = Object.assign(Dialog, {
  Title,
  Body,
  Footer,
});

export { DialogNamespace as Dialog };
