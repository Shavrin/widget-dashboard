import { SubmitHandler, useController, useForm } from "react-hook-form";
import { Button } from "../Button";
import { Settings, useSettings } from "../hooks/useSettings.ts";
import { Dialog } from "../Dialog/Dialog.tsx";
import { Field, Label, Select } from "@headlessui/react";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
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
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Title>Settings</Dialog.Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Body>
          <Field>
            <Label className="text-white">Stick widgets to: </Label>
            <Select
              value={field.value}
              onChange={field.onChange}
              className="rounded w-full p-1 bg-stone-300 text-stone-900"
            >
              <option value="Left" className="border-none">
                Left
              </option>
              <option value="Middle">Middle</option>
              <option value="Right">Right</option>
            </Select>
          </Field>
        </Dialog.Body>

        <Dialog.Footer>
          <Button type={Button.TYPES.SECONDARY} onClick={onClose}>
            cancel
          </Button>
          <Button htmlType="submit">save</Button>
        </Dialog.Footer>
      </form>
    </Dialog>
  );
}
