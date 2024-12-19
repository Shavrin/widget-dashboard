import { useCallback } from "react";
import { StickTo, useSettings } from "../hooks/useSettings.ts";
import { Widget } from "../Widget/Widget.tsx";
import { type WidgetType } from "../Widget/Widget.tsx";
import { CommandCenter } from "./CommandCenter.tsx";
import { useWidgets } from "../hooks/useWidgets.ts";

const layoutMap: Record<StickTo, string> = {
  Middle: "justify-center content-center",
  Left: "justify-start content-center",
  Right: "justify-end content-center",
  Top: "justify-center content-start",
  Bottom: "justify-center content-end",
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
    ({ id, widgetName }: WidgetType) => {
      setWidgets((widgets) =>
        widgets.map((widget) =>
          widget.id === id ? { id, widgetName } : widget,
        ),
      );
    },
    [setWidgets],
  );

  return (
    <main
      className={`h-lvh flex items-center ${layoutMap[settings.stickTo]} gap-5 flex-wrap bg-gradient-to-t from-stone-900 to-stone-950 p-8`}
    >
      {widgets.map(({ id, widgetName }) => (
        <Widget
          key={id}
          id={id}
          widgetName={widgetName}
          remove={() => removeWidget(id)}
          edit={editWidget}
        />
      ))}

      <CommandCenter addWidget={addWidget} />
    </main>
  );
}
