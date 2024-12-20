import { useLocalStorage } from "usehooks-ts";
import { type WidgetType } from "../Widget/Widget.ts";
import { v4 as uuid } from "uuid";
import { WidgetName } from "../Widget/Widget.tsx";

export const defaultWidgets: {
  id: string;
  widgetName: WidgetName;
}[] = [
  { id: uuid(), widgetName: "Timer" },
  {
    id: uuid(),
    widgetName: "RandomPokemon",
  },
  {
    id: uuid(),
    widgetName: "RandomImage",
  },
];

export function useWidgets() {
  return useLocalStorage<WidgetType[]>("widgets", defaultWidgets);
}
