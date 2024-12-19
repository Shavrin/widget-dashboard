import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Dialog } from "../Dialog/Dialog.tsx";
import { type WidgetType } from "../Widget/Widget.ts";
import { Button } from "../Button";
import { Field, Label, Select } from "@headlessui/react";
import * as sampleWidgets from "../SampleWidgets";

export type WidgetModalProps = {
  onConfirm: (props: WidgetType) => void;
  widget?: WidgetType;
  open: boolean;
  onClose: () => void;
};

export const WidgetModal = ({
  onConfirm,
  widget,
  open,
  onClose,
}: WidgetModalProps) => {
  const [widgetName, setWidgetName] = useState(widget?.widgetName ?? "Timer");

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault();

          onConfirm({
            id: widget?.id ?? uuid(),
            widgetName,
          });

          onClose();
        }}
      >
        <Dialog.Title>
          {widget ? "Edit widget" : "Create a widget"}
        </Dialog.Title>

        <Field>
          <Label className="text-white">Choose widget type: </Label>
          <Select
            value={widgetName}
            onChange={(event) =>
              setWidgetName(event.target.value as keyof typeof sampleWidgets)
            }
            className="rounded w-full p-1 bg-stone-300 text-stone-900"
          >
            {Object.keys(sampleWidgets).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
        </Field>

        <Dialog.Footer>
          <Button type={Button.TYPES.SECONDARY} onClick={onClose}>
            cancel
          </Button>
          <Button htmlType="submit">{widget ? "Edit" : "Create"}</Button>
        </Dialog.Footer>
      </form>
    </Dialog>
  );
};
