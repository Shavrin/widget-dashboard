import { ReactNode } from "react";
import {
  DialogTitle,
  Dialog as HDialog,
  type DialogProps,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <HDialog {...props} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70 duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="duration-200 ease-in data-[closed]:scale-95 data-[closed]:opacity-0 min-h-[200px] min-w-80 max-w-full space-y-4 rounded-3xl bg-stone-900 p-8 shadow-xl shadow-black"
        >
          {children}
        </DialogPanel>
      </div>
    </HDialog>
  );
};

function Title({ children }: { children: ReactNode }) {
  return (
    <DialogTitle className="text-3xl font-bold text-stone-300 mb-8">
      {children}
    </DialogTitle>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="mt-12 flex justify-end gap-8">{children}</div>;
}

const DialogNamespace = Object.assign(Dialog, {
  Title,
  Body,
  Footer,
});

export { DialogNamespace as Dialog };
