import { useRef } from "react";
import { Button } from "../Button";
import { DialogHandle, Modal } from "../Modal/Modal.tsx";

type ConfirmationModalProps = {
  onConfirm: () => void;
};

export function ConfirmationModal({ onConfirm }: ConfirmationModalProps) {
  const modalRef = useRef<DialogHandle>(null);

  return (
    <Modal ref={modalRef}>
      <Modal.Title>Are you sure?</Modal.Title>
      <Modal.Footer>
        <Button onClick={() => modalRef.current?.close()}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            modalRef.current?.close();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
