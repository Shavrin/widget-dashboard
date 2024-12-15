import { memo, useRef } from "react";
import { Button } from "../Button";
import { EllipsisVertical, Trash } from "../Icons.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";

export type TWidget = {
  id: string;
  title: string;
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
      <div className="hover:bg-cyan-700 border-2 hover:cursor-grabbing rounded-2xl bg-cyan-800 p-2 w-fit group relative">
        {title}
        <iframe
          srcDoc={script}
          className="pointer-events-none select-none h-full w-full overflow-hidden"
        />

        <div className="invisible group-hover:visible absolute top-0 left-0">
          <Button
            onClick={() => {
              modalRef.current?.open();
            }}
          >
            <EllipsisVertical />
          </Button>
        </div>

        <div className="invisible group-hover:visible absolute top-0 right-0">
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
