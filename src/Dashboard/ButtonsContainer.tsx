import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "../Button";
import { EllipsisVertical } from "../Icons.tsx";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { SettingsModal } from "../SettingsModal/SettingsModal.tsx";
import { useBoolean } from "usehooks-ts";
import { WidgetType } from "../Widget/types.ts";

export function ButtonsContainer({
  addWidget,
}: {
  addWidget: (widget: WidgetType) => void;
}) {
  const {
    value: isSettingsModalOpen,
    setTrue: openSettingsModal,
    setFalse: closeSettingsModal,
  } = useBoolean(false);

  const {
    value: isWidgetModalOpen,
    setTrue: openWidgetModal,
    setFalse: closeWidgetModal,
  } = useBoolean(false);

  return (
    <div className="fixed bottom-0 left-0 mb-3.5 ml-3.5 flex gap-2">
      <Menu>
        <MenuButton as="div">
          <Button type={Button.TYPES.PILL}>
            <EllipsisVertical />
          </Button>
        </MenuButton>
        <MenuItems anchor="top">
          <MenuItem>
            <button
              className="block h-8 min-w-80 rounded bg-green-800 data-[focus]:bg-blue-100"
              onClick={openSettingsModal}
            >
              Settings
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="block h-8 min-w-80 rounded bg-green-800 data-[focus]:bg-blue-100"
              onClick={openWidgetModal}
            >
              Create widget
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <WidgetModal
        open={isWidgetModalOpen}
        onClose={closeWidgetModal}
        onConfirm={(widget) => {
          addWidget(widget);
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettingsModal}
      />
    </div>
  );
}
