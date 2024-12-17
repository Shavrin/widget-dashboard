import { memo } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { type WidgetType } from "./types.ts";
import { useBoolean } from "usehooks-ts";
import { Menu } from "../Menu/Menu.tsx";
import { Button } from "../Button";
import { Plus } from "../Icons.tsx";

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
    <div className="group relative min-h-32 min-w-32 resize overflow-hidden rounded-2xl border-2 bg-cyan-800 hover:cursor-grabbing hover:bg-cyan-700">
      <iframe
        srcDoc={script}
        className="pointer-events-none h-full w-full select-none overflow-hidden"
      />

      <div className="invisible absolute right-0 top-0 group-hover:visible">
        <Menu
          trigger={
            <Button type={Button.TYPES.PILL}>
              <Plus />
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
