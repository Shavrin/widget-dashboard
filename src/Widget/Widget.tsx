import { memo } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { useBoolean } from "usehooks-ts";
import { Menu } from "../Menu/Menu.tsx";
import { Button } from "../Button";
import { EllipsisVertical } from "../Icons.tsx";
import * as sampleWidgets from "../SampleWidgets";

export type WidgetName = keyof typeof sampleWidgets;

export type WidgetType = {
  id: string;
  widgetName: WidgetName;
};

export type WidgetProps = WidgetType & {
  edit: (widget: WidgetType) => void;
  remove: () => void;
};

export const Widget = memo(({ widgetName, id, edit, remove }: WidgetProps) => {
  const {
    value: widgetDialogVisible,
    setTrue: showWidgetDialog,
    setFalse: hideWidgetDialog,
  } = useBoolean(false);

  const WidgetComponent = sampleWidgets[widgetName];

  return (
    <div
      aria-label="widget"
      tabIndex={0}
      className="group relative min-h-48 min-w-80 transition-transform ease-in-out hover:scale-105 overflow-hidden rounded-2xl bg-black hover:bg-gray-950 shadow-lg shadow-stone-950"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 select-none overflow-hidden">
        <WidgetComponent />
      </div>

      <div className="invisible group-hover:visible group-focus-within:visible absolute right-0 bottom-0 m-2">
        <Menu
          anchor="bottom"
          trigger={
            <Button type={Button.TYPES.PILL} aria-label="options">
              <EllipsisVertical />
            </Button>
          }
          options={[
            { name: "Edit", onClick: showWidgetDialog },
            { name: "Remove", onClick: remove },
          ]}
        />
      </div>

      <WidgetModal
        open={widgetDialogVisible}
        onClose={hideWidgetDialog}
        widget={{ widgetName, id }}
        onConfirm={edit}
      />
    </div>
  );
});
