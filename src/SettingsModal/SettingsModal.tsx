import { SubmitHandler, useController, useForm } from "react-hook-form";
import { Button } from "../Button";
import { Settings, StickTo, useSettings } from "../hooks/useSettings.ts";
import { Dialog } from "../Dialog/Dialog.tsx";
import { Field, Input, Label, Radio, RadioGroup } from "@headlessui/react";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useSettings();
  const { handleSubmit, control } = useForm<Settings>();
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
          <RadioGroup
            value={field.value}
            onChange={field.onChange}
            defaultValue={settings.stickTo ?? StickTo.Middle}
          >
            {Object.values(StickTo).map((option) => (
              <Field key={option} className="flex items-center gap-2">
                <Radio
                  value={option}
                  className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label>{option}</Label>
              </Field>
            ))}
          </RadioGroup>

          <div>
            Gap
            <Input type="range" min="0" max="100" step="5" defaultValue="50" />
          </div>
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
