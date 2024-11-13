import { DialogHandle, Modal } from "../Modal/Modal.tsx";
import { forwardRef, SyntheticEvent } from "react";
import { WidgetProps } from "../Widget/Widget.tsx";

type WidgetModalProps = {
  onAdd: (props: WidgetProps) => void;
};

const WidgetModal = forwardRef<DialogHandle, WidgetModalProps>(
  ({ onAdd }, ref) => {
    return (
      <Modal ref={ref}>
        <form
          onSubmit={(event: SyntheticEvent) => {
            event.preventDefault();

            const target = event.target as typeof event.target & {
              title: { value: string };
              script: { value: string };
            };

            onAdd({
              title: target.title.value,
              script: target.script.value,
            });
          }}
        >
          <Modal.Title>Create a widget</Modal.Title>
          <Modal.Body>
            <input id="title" type="text" />
            <textarea id="script" />
          </Modal.Body>
          <Modal.Footer>
            <button type="submit">Create!</button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  },
);

export { WidgetModal };
