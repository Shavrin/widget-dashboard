import { useCallback } from "react";
import { useSettings } from "../hooks/useSettings.ts";
import { Widget } from "../Widget/Widget.tsx";
import { type WidgetType } from "../Widget/types.ts";
import { ButtonsContainer } from "./ButtonsContainer.tsx";
import { useWidgets } from "../hooks/useWidgets.ts";

const layoutMap = {
  Middle: "flex justify-center items-center gap-5",
  Left: "flex justify-start items-center gap-5",
  Right: "flex justify-end items-center gap-5",
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
    ({ id, title, script }: WidgetType) => {
      setWidgets((widgets) =>
        widgets.map((widget) =>
          widget.id === id ? { id, title, script } : widget,
        ),
      );
    },
    [setWidgets],
  );
  console.log(settings);
  const layout = layoutMap[settings.stickTo];

  return (
    <div
      className={`h-full ${layout} flex-wrap bg-gradient-to-t from-cyan-950 to-cyan-900`}
    >
      {widgets.map(({ id, title, script }) => (
        <Widget
          key={id}
          id={id}
          title={title}
          script={script}
          remove={removeWidget}
          edit={editWidget}
        />
      ))}

      <ButtonsContainer addWidget={addWidget} />
    </div>
  );
}
