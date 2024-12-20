import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Dialog } from "../Dialog/Dialog.tsx";
import { type WidgetType } from "../Widget/Widget.ts";
import { Button } from "../Button";
import * as sampleWidgets from "../SampleWidgets";
import { type WidgetName } from "../Widget/Widget.tsx";
import { Select } from "../Select/Select.tsx";

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

        <Dialog.Body>
          <Select
            label="Choose widget type: "
            value={widgetName}
            onChange={(value) => setWidgetName(value as WidgetName)}
            options={Object.keys(sampleWidgets).map((key) => ({
              value: key,
              label: key,
            }))}
          />
        </Dialog.Body>

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
