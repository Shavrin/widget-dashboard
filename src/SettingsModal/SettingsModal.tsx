import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Input,
  Select,
} from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { Settings, useSettings } from "../hooks/useSettings.ts";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useSettings();
  const { register, handleSubmit } = useForm<Settings>();

  const onSubmit: SubmitHandler<Settings> = (data) => {
    setSettings(data);
    onClose();
  };

  console.log(settings);
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="min-h-96 min-w-80 max-w-lg space-y-4 rounded-3xl border-2 border-cyan-200 bg-gray-800 p-8 shadow-2xl shadow-pink-800">
          <DialogTitle className="text-3xl font-bold text-gray-300">
            Settings
          </DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Select {...register("stickTo")} defaultValue={settings.stickTo}>
                <option value="Left">Left</option>
                <option value="Middle">Middle</option>
                <option value="Right">Right</option>
              </Select>
            </div>

            <div>
              <Input {...register("gap")} type="number" />
            </div>

            <div className="flex gap-4">
              <Button type={Button.TYPES.SECONDARY} onClick={onClose}>
                Cancel
              </Button>
              <Button htmlType="submit">Save</Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
