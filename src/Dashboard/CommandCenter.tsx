import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { SettingsModal } from "../SettingsModal/SettingsModal.tsx";
import { useBoolean } from "usehooks-ts";
import { WidgetType } from "../Widget/Widget.tsx";
import { Menu } from "../Menu/Menu.tsx";
import { Button } from "../Button";
import { EllipsisVertical } from "../Icons.tsx";

export function CommandCenter({
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
    <div className="fixed bottom-2 left-4 flex gap-2">
      <Menu
        trigger={
          <Button type={Button.TYPES.PILL} ariaLabel="dashboard options">
            <EllipsisVertical />
          </Button>
        }
        options={[
          { name: "Settings", onClick: openSettingsModal },
          { name: "Create widget", onClick: openWidgetModal },
        ]}
      />

      <WidgetModal
        open={isWidgetModalOpen}
        onClose={closeWidgetModal}
        onConfirm={(widget) => {
          addWidget(widget);
        }}
      />

      <SettingsModal open={isSettingsModalOpen} onClose={closeSettingsModal} />
    </div>
  );
}
