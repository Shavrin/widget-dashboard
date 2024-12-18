import { memo } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { type WidgetType } from "./types.ts";
import { useBoolean } from "usehooks-ts";
import { Menu } from "../Menu/Menu.tsx";
import { Button } from "../Button";
import { EllipsisVertical } from "../Icons.tsx";

export type WidgetProps = WidgetType & {
  edit: (widget: WidgetType) => void;
  remove: (id: string) => void;
};

export const Widget = memo(({ script, id, edit, remove }: WidgetProps) => {
  const {
    value: widgetDialogVisible,
    setTrue: showWidgetDialog,
    setFalse: hideWidgetDialog,
  } = useBoolean(false);

  return (
    <div
      tabIndex={0}
      className="group relative min-h-32 min-w-32 overflow-hidden rounded-2xl bg-black hover:bg-gray-950 shadow-lg shadow-stone-950"
    >
      <iframe
        srcDoc={script}
        tabIndex={-1}
        className="pointer-events-none h-full w-full select-none overflow-hidden"
      />

      <div className="invisible group-hover:visible group-focus-within:visible absolute right-0 bottom-0 m-2">
        <Menu
          anchor="bottom"
          trigger={
            <Button type={Button.TYPES.PILL}>
              <EllipsisVertical />
            </Button>
          }
          options={[
            { name: "Edit", onClick: showWidgetDialog },
            { name: "Remove", onClick: () => remove(id) },
          ]}
        ></Menu>
      </div>

      <WidgetModal
        open={widgetDialogVisible}
        onClose={hideWidgetDialog}
        widget={{ script, id }}
        onConfirm={edit}
      />
    </div>
  );
});
