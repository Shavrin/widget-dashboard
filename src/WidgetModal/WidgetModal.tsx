import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Dialog } from "../Dialog/Dialog.tsx";
import { type WidgetType } from "../Widget/types.ts";
import { Button } from "../Button";
import { Editor } from "@monaco-editor/react";

type WidgetModalProps = {
  onConfirm: (props: WidgetType) => void;
  widget?: WidgetType;
  open: boolean;
  onClose: () => void;
};

const defaultScript = `<div id="root"></div>
<script>
    
</script>`;

export const WidgetModal = ({
  onConfirm,
  widget,
  open,
  onClose,
}: WidgetModalProps) => {
  const [script, setScript] = useState(widget?.script ?? defaultScript);

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault();

          onConfirm({
            id: widget?.id ?? uuid(),
            script,
          });

          onClose();
        }}
      >
        <Dialog.Title>Create a widget</Dialog.Title>
        <div className="rounded-lg overflow-hidden resize min-h-80 h-80 w-full">
          <Editor
            height="100%"
            language="html"
            value={script}
            theme="vs-dark"
            onChange={(value) => setScript(value ?? "")}
            options={{
              lineNumbers: "off",
              guides: { indentation: false },
              codeLens: false,
              padding: { top: 20 },
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>

        <Dialog.Footer>
          <Button type={Button.TYPES.SECONDARY} onClick={onClose}>
            cancel
          </Button>
          <Button htmlType="submit">{widget ? "edit" : "create"}</Button>
        </Dialog.Footer>
      </form>
    </Dialog>
  );
};
