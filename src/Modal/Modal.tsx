import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

type ModalProps = {
  children: ReactNode;
};
export type DialogHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<DialogHandle, ModalProps>(({ children }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => modalRef.current?.showModal(),
      close: () => modalRef.current?.close(),
    }),
    [],
  );

  return (
    <dialog
      ref={modalRef}
      className="backdrop:backdrop-blur-sm m-auto p-4 rounded-2xl border-2 border-cyan-200 bg-sky-600 min-w-96"
    >
      {children}
    </dialog>
  );
});

type TitleProps = {
  children: ReactNode;
};

function ModalTitle({ children }: TitleProps) {
  return (
    <h3 className="text-3xl border-b-2 border-red-950 mb-6">{children}</h3>
  );
}

type BodyProps = {
  children: ReactNode;
};

function ModalBody({ children }: BodyProps) {
  return <div className="mb-1.5 mt-1.5">{children}</div>;
}

type FooterProps = {
  children: ReactNode;
};

function ModalFooter({ children }: FooterProps) {
  return <div className="mb-1.5 mt-1.5">{children}</div>;
}

const ModalNamespace = Object.assign(Modal, {
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { ModalNamespace as Modal };
