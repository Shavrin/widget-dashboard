import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { memo } from "react";
import { Button } from "../Button";
import { Plus } from "../Icons.tsx";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { type WidgetType } from "./types.ts";
import { useBoolean } from "usehooks-ts";

export type WidgetProps = WidgetType & {
  edit: (widget: WidgetType) => void;
  remove: (id: string) => void;
};

export const Widget = memo(
  ({ title, script, id, edit, remove }: WidgetProps) => {
    const {
      value: widgetDialogVisible,
      setTrue: showWidgetDialog,
      setFalse: hideWidgetDialog,
    } = useBoolean(false);

    return (
      <>
        <div className="group relative min-h-32 min-w-32 resize overflow-hidden rounded-2xl border-2 bg-cyan-800 hover:cursor-grabbing hover:bg-cyan-700">
          {title}
          <iframe
            srcDoc={script}
            className="pointer-events-none h-full w-full select-none overflow-hidden"
          />

          <div className="invisible absolute right-0 top-0 group-hover:visible">
            <Menu>
              <MenuButton as="div">
                <Button type={Button.TYPES.PILL}>
                  <Plus />
                </Button>
              </MenuButton>
              <MenuItems anchor="top">
                <MenuItem>
                  <button
                    className="block data-[focus]:bg-blue-100"
                    onClick={showWidgetDialog}
                  >
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="block data-[focus]:bg-blue-100"
                    onClick={() => remove(id)}
                  >
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

        <WidgetModal
          open={widgetDialogVisible}
          onClose={hideWidgetDialog}
          widget={{ title, script, id }}
          onConfirm={edit}
        />
      </>
    );
  },
);
