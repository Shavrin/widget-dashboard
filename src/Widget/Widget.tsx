import { memo, useRef } from "react";
import { Button } from "../Button";
import { EllipsisVertical, Trash } from "../Icons.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";

export type TWidget = {
  id: string;
  title?: string;
  script: string;
};

export type WidgetProps = TWidget & {
  edit: (widget: TWidget) => void;
  remove: (id: string) => void;
};

const Widget = memo(({ title, script, id, edit, remove }: WidgetProps) => {
  const modalRef = useRef<DialogHandle>(null);

  return (
    <>
      <div className="group relative w-fit rounded-2xl border-2 bg-cyan-800 p-2 hover:cursor-grabbing hover:bg-cyan-700 resize">
        {title}
        <iframe
          srcDoc={script}
          className="pointer-events-none h-full w-full select-none overflow-hidden"
        />

        <div className="invisible absolute left-0 top-0 group-hover:visible">
          <Button
            onClick={() => {
              modalRef.current?.open();
            }}
          >
            <EllipsisVertical />
          </Button>
        </div>

        <div className="invisible absolute right-0 top-0 group-hover:visible">
          <Button onClick={() => remove(id)}>
            <Trash />
          </Button>
        </div>
      </div>

      <WidgetModal
        ref={modalRef}
        widget={{ title, script, id }}
        onConfirm={(widget) => {
          edit(widget);
          modalRef.current?.close();
        }}
      />
    </>
  );
});

export { Widget };
