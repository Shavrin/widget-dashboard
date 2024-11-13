import styles from "./Modal.module.css";
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
    <dialog ref={modalRef} className={styles.modal}>
      {children}
    </dialog>
  );
});

type TitleProps = {
  children: ReactNode;
};

function ModalTitle({ children }: TitleProps) {
  return children;
}

type BodyProps = {
  children: ReactNode;
};

function ModalBody({ children }: BodyProps) {
  return children;
}

type FooterProps = {
  children: ReactNode;
};

function ModalFooter({ children }: FooterProps) {
  return children;
}

const ModalNamespace = Object.assign(Modal, {
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { ModalNamespace as Modal };
