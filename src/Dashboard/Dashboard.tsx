import { useCallback } from "react";
import { StickTo, useSettings } from "../hooks/useSettings.ts";
import { Widget } from "../Widget/Widget.tsx";
import { type WidgetType } from "../Widget/Widget.tsx";
import { CommandCenter } from "./CommandCenter.tsx";
import { useWidgets } from "../hooks/useWidgets.ts";

const layoutMap: Record<StickTo, string> = {
  Middle: "flex justify-center items-center",
  Left: "flex justify-start items-center",
  Right: "flex justify-end items-center",
};

export function Dashboard() {
  const [widgets, setWidgets] = useWidgets();
  const [settings] = useSettings();

  const addWidget = useCallback(
    (widget: WidgetType) => {
      setWidgets((widgets) => [...widgets, widget]);
    },
    [setWidgets],
  );

  const removeWidget = useCallback(
    (id: string) => {
      setWidgets((widgets) =>
        widgets.filter(({ id: widgetId }) => id !== widgetId),
      );
    },
    [setWidgets],
  );

  const editWidget = useCallback(
    ({ id, script }: WidgetType) => {
      setWidgets((widgets) =>
        widgets.map((widget) => (widget.id === id ? { id, script } : widget)),
      );
    },
    [setWidgets],
  );

  return (
    <div
      className={`h-full ${layoutMap[settings.stickTo]} gap-5 flex-wrap content-center bg-gradient-to-t from-stone-900 to-stone-950 p-8`}
    >
      {widgets.map(({ id, script }) => (
        <Widget
          key={id}
          id={id}
          script={script}
          remove={removeWidget}
          edit={editWidget}
        />
      ))}

      <CommandCenter addWidget={addWidget} />
    </div>
  );
}
