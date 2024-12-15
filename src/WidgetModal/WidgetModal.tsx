import { DialogHandle, Modal } from "../Modal/Modal.tsx";
import { forwardRef, SyntheticEvent, useState } from "react";
import { type TWidget } from "../Widget/Widget.tsx";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { v4 as uuid } from "uuid";

type WidgetModalProps = {
  onConfirm: (props: TWidget) => void;
  widget?: TWidget;
};

const defaultScript = `<div id="root"></div>
    <script>
    
    </script>`;

const highlighter = (code: string) => highlight(code, languages.html, "html");

const WidgetModal = forwardRef<DialogHandle, WidgetModalProps>(
  ({ onConfirm, widget }, ref) => {
    const [title, setTitle] = useState(widget?.title ?? "Title");
    const [script, setScript] = useState(widget?.script ?? defaultScript);

    return (
      <Modal ref={ref}>
        <form
          onSubmit={(event: SyntheticEvent) => {
            event.preventDefault();

            onConfirm({
              id: widget?.id ?? uuid(),
              title,
              script,
            });
          }}
        >
          <Modal.Title>Create a widget</Modal.Title>
          <Modal.Body>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Editor
              highlight={highlighter}
              onValueChange={setScript}
              value={script}
              className="rounded bg-white resize min-w-96 mt-1.5"
            />
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
