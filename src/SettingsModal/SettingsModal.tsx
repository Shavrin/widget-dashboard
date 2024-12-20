import { SubmitHandler, useController, useForm } from "react-hook-form";
import { Button } from "../Button";
import { Settings, StickTo, useSettings } from "../hooks/useSettings.ts";
import { Dialog } from "../Dialog/Dialog.tsx";
import { Select } from "../Select/Select.tsx";

export type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useSettings();
  const { handleSubmit, control } = useForm<Settings>({
    defaultValues: settings,
  });
  const { field } = useController({ control, name: "stickTo" });

  const onSubmit: SubmitHandler<Settings> = (data) => {
    setSettings(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>Settings</Dialog.Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Body>
          <Select
            label="Stick widgets to: "
            value={field.value}
            onChange={field.onChange}
            options={Object.keys(StickTo).map((key) => ({
              value: key,
              label: key,
            }))}
          />
        </Dialog.Body>

        <Dialog.Footer>
          <Button type={Button.TYPES.SECONDARY} onClick={onClose}>
            Cancel
          </Button>
          <Button htmlType="submit">Save</Button>
        </Dialog.Footer>
      </form>
    </Dialog>
  );
}
