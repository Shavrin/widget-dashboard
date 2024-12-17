import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { SyntheticEvent, useState } from "react";
import Editor from "react-simple-code-editor";
import { v4 as uuid } from "uuid";
import { Dialog } from "../Dialog/Dialog.tsx";
import { type WidgetType } from "../Widget/types.ts";

type WidgetModalProps = {
  onConfirm: (props: WidgetType) => void;
  widget?: WidgetType;
  open: boolean;
  onClose: () => void;
};

const defaultScript = `<div id="root"></div>
    <script>
    
    </script>`;

const highlighter = (code: string) => highlight(code, languages.html, "html");

export const WidgetModal = ({
  onConfirm,
  widget,
  open,
  onClose,
}: WidgetModalProps) => {
  const [title, setTitle] = useState(widget?.title ?? "Title");
  const [script, setScript] = useState(widget?.script ?? defaultScript);

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Dialog.Title>Create a widget</Dialog.Title>
        <Dialog.Body>
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
            className="mt-1.5 min-w-96 resize rounded bg-white"
          />
        </Dialog.Body>
        <Dialog.Footer>
          <button type="submit">Create!</button>
        </Dialog.Footer>
      </form>
    </Dialog>
  );
};
