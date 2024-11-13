import { DialogHandle, Modal } from "../Modal/Modal.tsx";
import { forwardRef, SyntheticEvent, useState } from "react";
import { WidgetProps } from "../Widget/Widget.tsx";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

type WidgetModalProps = {
  onAdd: (props: WidgetProps) => void;
};

const WidgetModal = forwardRef<DialogHandle, WidgetModalProps>(
  ({ onAdd }, ref) => {
    const [title, setTitle] = useState("Title");
    const [script, setScript] = useState(
      "  <html>\n" +
        "      <body>\n" +
        '        <div id="root"/>\n' +
        "        <script></script>\n" +
        "      </body>\n" +
        "   </html>`",
    );

    return (
      <Modal ref={ref}>
        <form
          onSubmit={(event: SyntheticEvent) => {
            event.preventDefault();

            onAdd({
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
              highlight={(code) => highlight(code, languages.html, "html")}
              onValueChange={setScript}
              value={script}
              style={{ border: "1px solid black" }}
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
